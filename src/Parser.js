import qs from 'qs';

export default class Parser {
  constructor(builder) {
    this.builder = builder;
    this.uri = '';
  }

  // parse the final query string
  parse() {
    this.includes();
    this.appends();
    this.fields();
    this.filters();
    this.sorts();
    this.page();
    this.limit();
    this.params();

    return this.uri;
  }

  /**
   * Helpers
   */

  hasIncludes() {
    return this.builder.includes.length > 0;
  }

  hasAppends() {
    return this.builder.appends.length > 0;
  }

  hasFields() {
    return Object.keys(this.builder.fields).length > 0;
  }

  hasFilters() {
    return Object.keys(this.builder.filters).length > 0;
  }

  hasSorts() {
    return this.builder.sorts.length > 0;
  }

  hasPage() {
    return this.builder.pageValue !== null;
  }

  hasLimit() {
    return this.builder.limitValue !== null;
  }

  hasParams() {
    return this.builder.params !== null;
  }

  prepend() {
    return this.uri === '' ? '?' : '&';
  }

  /**
   * Parsers
   */

  includes() {
    if (!this.hasIncludes()) {
      return;
    }

    this.uri +=
      `${this.prepend() +
      this.builder.queryParameters.includes 
      }=${ 
      this.builder.includes}`;
  }

  appends() {
    if (!this.hasAppends()) {
      return;
    }

    this.uri +=
      `${this.prepend() +
      this.builder.queryParameters.appends 
      }=${ 
      this.builder.appends}`;
  }

  fields() {
    if (!this.hasFields()) {
      return;
    }

    const fields = { [this.builder.queryParameters.fields]: this.builder.fields };
    this.uri += this.prepend() + qs.stringify(fields, { encode: false });
  }

  filters() {
    if (!this.hasFilters()) {
      return;
    }

    const filters = { [this.builder.queryParameters.filters]: this.builder.filters };
    this.uri += this.prepend() + qs.stringify(filters, { encode: false });
  }

  sorts() {
    if (!this.hasSorts()) {
      return;
    }

    this.uri +=
      `${this.prepend() + this.builder.queryParameters.sort  }=${  this.builder.sorts}`;
  }

  page() {
    if (!this.hasPage()) {
      return;
    }

    this.uri +=
      `${this.prepend() +
      this.builder.queryParameters.page 
      }=${ 
      this.builder.pageValue}`;
  }

  limit() {
    if (!this.hasLimit()) {
      return;
    }

    this.uri +=
      `${this.prepend() +
      this.builder.queryParameters.limit 
      }=${ 
      this.builder.limitValue}`;
  }

  params() {
    if (!this.hasParams()) {
      return;
    }

    this.uri +=
      this.prepend() + qs.stringify(this.builder.params, { encode: false });
  }
}
