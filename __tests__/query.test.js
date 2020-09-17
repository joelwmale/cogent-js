import { Query } from '../src';

describe('Query builder', () => {
  test('it can override query names depending on config', () => {
    const query = new Query({
      queryParameters: {
        includes: 'includes',
        fields: 'select'
      }
    });

    query
      .for('pizza')
      .includes('toppings')
      .select('name');

    const expected = '/pizza?includes=toppings&select[pizza]=name';

    expect(query.url()).toEqual(expected);
  });

  test('it can prepend an api url', () => {
    const query = new Query({
      base_url: 'https://api.example.com'
    });

    query.for('pizza').includes('toppings');

    const expected = 'https://api.example.com/pizza?include=toppings';

    expect(query.url()).toEqual(expected);
  });

  test('it throws an error if for() is not included', () => {
    expect.assertions(1);

    try {
      const query = new Query();

      query.includes('toppings').url();
    } catch (e) {
      expect(e.message).toBe('Please call the for() method before adding filters or calling url() / get().');
    }
  });

  test('it builds a simple query with appends()', () => {
    const query = new Query();

    query.for('pizza').appends('full_name', 'rating');

    const expected = '/pizza?append=full_name,rating';

    expect(query.url()).toEqual(expected);
  });

  test('it throws an exception if no argument is passed into appends()', () => {
    expect.assertions(1);

    try {
      const query = new Query();

      query.for('pizza').appends();
    } catch (e) {
      expect(e.message).toBe('The appends() function takes at least one argument.');
    }
  });

  test('it builds a simple query with includes()', () => {
    const query = new Query();

    query.for('pizza').includes('toppings');

    const expected = '/pizza?include=toppings';

    expect(query.url()).toEqual(expected);
  });

  test('it throws an exception if no argument is passed into includes()', () => {
    expect.assertions(1);

    try {
      const query = new Query();

      query.for('pizza').includes();
    } catch (e) {
      expect(e.message).toBe('The includes() function takes at least one argument.');
    }
  });

  test('it builds a simple query with where()', () => {
    const query = new Query();

    query.for('pizza').where('topping', 'cheese');

    const expected = '/pizza?filter[topping]=cheese';

    expect(query.url()).toEqual(expected);
  });

  test('it throws an exception if less than two arguments are passed into where()', () => {
    expect.assertions(1);

    try {
      const query = new Query();

      query.for('pizza').where('topping');
    } catch (e) {
      expect(e.message).toBe('The where() function takes 2 arguments both of string values.');
    }
  });

  test('it builds a simple query with whereIn()', () => {
    const query = new Query();

    query.for('pizza').whereIn('topping', ['beef', 'cheese']);

    const expected = '/pizza?filter[topping]=beef,cheese';

    expect(query.url()).toEqual(expected);
  });

  test('it throws an exception if no arguments are passed into whereIn()', () => {
    expect.assertions(1);

    try {
      const query = new Query();

      query.for('pizza').whereIn();
    } catch (e) {
      expect(e.message).toBe('The whereIn() function takes 2 arguments of (string, array).');
    }
  });

  test('it throws an exception if no arguments are passed into whereIn()', () => {
    expect.assertions(1);

    try {
      const query = new Query();

      query.for('pizza').whereIn();
    } catch (e) {
      expect(e.message).toBe('The whereIn() function takes 2 arguments of (string, array).');
    }
  });

  test('it throws an exception if the first argument passed to whereIn() is not a string or integer', () => {
    expect.assertions(1);

    try {
      const query = new Query();

      query.for('pizza').whereIn(['oranges'], ['oranges', 'apples']);
    } catch (e) {
      expect(e.message).toBe('The first argument for the whereIn() function must be a string or integer.');
    }
  });

  test('it throws an exception if the second argument passed to whereIn() is not an array', () => {
    expect.assertions(1);

    try {
      const query = new Query();

      query.for('pizza').whereIn('oranges', 'oranges,apples');
    } catch (e) {
      expect(e.message).toBe('The second argument for the whereIn() function must be an array.');
    }
  });

  test('it builds a simple query with select()', () => {
    const query = new Query();

    query.for('pizza').select('name', 'date_added');

    const expected = '/pizza?fields[pizza]=name,date_added';

    expect(query.url()).toEqual(expected);
  });

  test('it throws an exception if no argument is passed into select()', () => {
    expect.assertions(1);

    try {
      const query = new Query();

      query.for('pizza').select();
    } catch (e) {
      expect(e.message).toBe('The fields() function takes a single argument of an array.');
    }
  });

  test('it throws a config appropriate exception if no argument is passed into select()', () => {
    expect.assertions(1);

    try {
      const query = new Query({
        queryParameters: {
          fields: 'select'
        }
      });

      query.for('pizza').select();
    } catch (e) {
      expect(e.message).toBe('The select() function takes a single argument of an array.');
    }
  });

  test('it can limit the query', () => {
    const query = new Query();

    query
      .for('pizza')
      .where('name', 'meatlovers')
      .limit(5);

    const expected = '/pizza?filter[name]=meatlovers&limit=5';

    expect(query.url()).toEqual(expected);
  });

  test('it can paginate the query', () => {
    const query = new Query();

    query
      .for('pizza')
      .limit(5)
      .page(2);

    const expected = '/pizza?page=2&limit=5';

    expect(query.url()).toEqual(expected);
  });

  test('it can sort the query', () => {
    const query = new Query();

    query.for('pizza').sort('-name', 'flavour');

    const expected = '/pizza?sort=-name,flavour';

    expect(query.url()).toEqual(expected);
  });

  test('it can append params', () => {
    const query = new Query();

    query
      .for('pizza')
      .where('name', 'meatlovers')
      .params({ format: 'admin' });

    const expected = '/pizza?filter[name]=meatlovers&format=admin';

    expect(query.url()).toEqual(expected);
  });

  test('the query object can be reused', () => {
    const query = new Query();

    const actualOne = query
      .for('pizza')
      .where('name', 'macaroni_and_cheese')
      .get();

    const expectedOne =
      '/pizza?filter[name]=macaroni_and_cheese';

    const actualTwo = query
      .for('pizza')
      .where('name', 'meatlovers')
      .get();

    const expectedTwo =
      '/pizza?filter[name]=meatlovers';

    expect(actualOne).toEqual(expectedOne);
    expect(actualTwo).toEqual(expectedTwo);
  });

  test('it builds a semi-complex query', () => {
    const query = new Query();

    query
      .for('pizza')
      .where('name', 'macaroni_and_cheese')
      .includes('toppings')
      .appends('full_name')
      .select('name', 'ratings')
      .params({ format: 'basic' });

    const expected =
      '/pizza?include=toppings&append=full_name&fields[pizza]=name,ratings&filter[name]=macaroni_and_cheese&format=basic';

    expect(query.url()).toEqual(expected);
  });
});
