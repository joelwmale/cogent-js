import qs from "qs";

export default class Parser {
  constructor(query) {
    this.query = query;
    this.uri = "";
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

  prepend() {
    return this.uri === "" ? "?" : "&";
  }

  /**
   * Parsers
   */
  includes() {
    const { includes, queryParameters } = this.query;
    if (!includes.length > 0) return;

    this.uri += `${this.prepend() + queryParameters.includes}=${includes}`;
  }

  appends() {
    const { appends, queryParameters } = this.query;

    if (!this.query.appends.length > 0) return;

    this.uri += `${this.prepend() + queryParameters.appends}=${appends}`;
  }

  fields() {
    const { fields: qFields, queryParameters } = this.query;

    if (!Object.keys(qFields).length) return;

    const fields = { [queryParameters.fields]: qFields };
    this.uri += this.prepend() + qs.stringify(fields, { encode: false });
  }

  filters() {
    const { filters: fil, queryParameters } = this.query;
    if (!Object.keys(fil).length) return;

    const filters = { [queryParameters.filters]: fil };
    console.log("uri start, ", this.uri);

    console.log("this.prepend()", this.prepend());
    console.log("filters", filters);
    console.log(
      "qs.stringify(filters, { encode: false })",
      qs.stringify(filters, { encode: false })
    );

    this.uri += this.prepend() + qs.stringify(filters, { encode: false });

    console.log("uri finish, ", this.uri);
  }

  sorts() {
    const { sorts, queryParameters } = this.query;

    if (!sorts.length) return;

    this.uri += `${this.prepend() + queryParameters.sort}=${sorts}`;
  }

  page() {
    if (this.query.pageValue === null) {
      return;
    }

    this.uri += `${this.prepend() + this.query.queryParameters.page}=${
      this.query.pageValue
    }`;
  }

  limit() {
    if (this.query.limitValue === null) {
      return;
    }

    this.uri += `${this.prepend() + this.query.queryParameters.limit}=${
      this.query.limitValue
    }`;
  }

  params() {
    if (this.query.paramsObj === null) {
      return;
    }

    this.uri +=
      this.prepend() + qs.stringify(this.query.paramsObj, { encode: false });
  }
}
