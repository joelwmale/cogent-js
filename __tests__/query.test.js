import { Query } from '../src';

describe('Query builder', () => {
  test('it can override filter names', () => {
    const query = new Query({
      queryParameters: {
        includes: 'includes',
        fields: 'select'
      }
    });

    query
      .for('pizza')
      .include('toppings')
      .select('name');

    const expected = '/pizza?includes=toppings&select=name';

    expect(query.url()).toEqual(expected);
  });

  test('it can prepend an api url', () => {
    const query = new Query({
      base_url: 'https://api.example.com'
    });

    query.for('pizza').include('toppings');

    const expected = 'https://api.example.com/pizza?include=toppings';

    expect(query.url()).toEqual(expected);
  });

  test('it builds a simple query with include()', () => {
    const query = new Query();

    query.for('pizza').include('toppings');

    const expected = '/pizza?include=toppings';

    expect(query.url()).toEqual(expected);
  });

  test('it builds a simple query with where()', () => {
    const query = new Query();

    query.for('pizza').where('topping', 'cheese');

    const expected = '/pizza?filter[topping]=cheese';

    expect(query.url()).toEqual(expected);
  });

  test('it builds a simple query with whereIn()', () => {
    const query = new Query();

    query.for('pizza').whereIn('topping', ['beef', 'cheese']);

    const expected = '/pizza?filter[topping]=beef,cheese';

    expect(query.url()).toEqual(expected);
  });

  test('it builds a simple query with append()', () => {
    const query = new Query();

    query.for('pizza').append('full_name', 'rating');

    const expected = '/pizza?append=full_name,rating';

    expect(query.url()).toEqual(expected);
  });

  test('it builds a simple query with select()', () => {
    const query = new Query();

    query.for('pizza').select('name', 'date_added');

    const expected = '/pizza?fields=name,date_added';

    expect(query.url()).toEqual(expected);
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
      .params({format: 'admin'});

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
      .include('toppings')
      .append('full_name')
      .select('name', 'ratings')
      .params({format: 'basic'});

    const expected =
      '/pizza?include=toppings&append=full_name&fields=name,ratings&filter[name]=macaroni_and_cheese&format=basic';

    expect(query.url()).toEqual(expected);
  });
});
