import Parser from './Parser';

export default class Query {
  constructor(options = {}) {
    // @TODO validate options is an object
    // if (options && typeof(options) !== Object) {
    //   throw new Error('Please pass in an options object to the constructor.');
    // }

    this.model = null;

    // Base url if passed
    this.base_url = options.base_url || null;

    // default filter names
    this.queryParameters = options.queryParameters || {
      filters: 'filter',
      fields: 'fields',
      includes: 'include',
      appends: 'append',
      page: 'page',
      limit: 'limit',
      sort: 'sort'
    };

    this.includes = [];
    this.appends = [];
    this.sorts = [];
    this.pageValue = null;
    this.limitValue = null;
    this.params = null;

    this.fields = {};
    this.filters = {};

    this.parser = new Parser(this);
  }

  // set the model for the query
  for(model) {
    this.model = model;

    return this;
  }

  // return the parsed url
  get() {
    return this.base_url
      ? this.base_url + this.parseQuery()
      : this.parseQuery();
  }

  url() {
    return this.base_url
      ? this.base_url + this.parseQuery()
      : this.parseQuery();
  }

  parseQuery() {
    if (!this.model) {
      throw new Error('Please call the for() method before adding filters.');
    }

    return `/${this.model}${this.parser.parse()}`;
  }

  /**
   * Query builder
   */
  include(...args) {
    this.includes = args;

    return this;
  }

  append(...args) {
    this.appends = args;

    return this;
  }

  select(...fields) {
    if (fields.length === 0) {
      throw new Error('You must provide an array to the fields() method.');
    }

    // single entity .fields(['age', 'firstname'])
    if (fields[0].constructor === String || Array.isArray(fields[0])) {
      this.fields = fields.join(',');
    }

    // related entities .fields({ posts: ['title', 'content'], user: ['age', 'firstname']} )
    if (fields[0].constructor === Object) {
      Object.entries(fields[0]).forEach(([key, value]) => {
        this.fields[key] = value.join(',');
      });
    }

    return this;
  }

  where(key, value) {
    if (key === undefined || value === undefined)
      throw new Error('The KEY and VALUE are required on where() method.');

    if (Array.isArray(value) || value instanceof Object)
      throw new Error('The VALUE must be primitive on where() method.');

    this.filters[key] = value;

    return this;
  }

  whereIn(key, array) {
    if (!Array.isArray(array))
      throw new Error('The second argument on whereIn() method must be an array.');

    this.filters[key] = array.join(',');

    return this;
  }

  sort(...args) {
    this.sorts = args;

    return this;
  }

  page(value) {
    if (!Number.isInteger(value)) {
      throw new Error('The VALUE must be an integer on page() method.');
    }

    this.pageValue = value;

    return this;
  }

  limit(value) {
    if (!Number.isInteger(value)) {
      throw new Error('The VALUE must be an integer on limit() method.');
    }

    this.limitValue = value;

    return this;
  }

  params(params) {
    if (params === undefined || params.constructor !== Object) {
      throw new Error('You must pass a params/object as param.');
    }

    this.params = params;

    return this;
  }
}
