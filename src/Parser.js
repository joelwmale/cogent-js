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
    this.related();

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
    if (!includes.length) return;

    this.uri += `${this.returnBaseUri(queryParameters.includes)}=${includes}`;
  }

  appends() {
    const { appends, queryParameters } = this.query;

    if (!appends.length) return;

    this.uri += `${this.returnBaseUri(queryParameters.appends)}=${appends}`;
  }

  fields() {
    const { fields: qFields, queryParameters } = this.query;

    if (!Object.keys(qFields).length) return;

    const fields = { [queryParameters.fields]: qFields };
    this.uri += this.returnBaseUri(this.returnQsData(fields));
  }

  filters() {
    const { filters: fil, queryParameters } = this.query;
    if (!Object.keys(fil).length) return;

    const filters = { [queryParameters.filters]: fil };
    const filterPath = this.returnQsData(filters);

    this.uri += this.returnBaseUri(filterPath);
  }

  related() {
    const { filters: fil, related, queryParameters } = this.query;
    if (!Object.keys(related).length) return;

    // since all the magic happens in
    // qs (qs.stringify(filters, { encode: false });),
    // and I don’t have any desire to fork it and rewrite (rofl)
    // we insert such a castil
    const newFil = {};
    const keys = Object.keys(fil);
    keys.forEach(el => {
      if (related[el]) {
        newFil[el + "][" + related[el]] = fil[el]; // eslint-disable-line
      }
    });

    const filters = { [queryParameters.filters]: newFil };

    const filterPath = this.returnQsData(filters);

    this.uri += this.returnBaseUri(filterPath);
  }

  sorts() {
    const { sorts, queryParameters } = this.query;

    if (!sorts.length) return;

    this.uri += `${this.returnBaseUri(queryParameters.sort)}=${sorts}`;
  }

  page() {
    const { pageValue, queryParameters } = this.query;
    if (!pageValue) return;

    this.uri += `${this.returnBaseUri(queryParameters.page)}=${pageValue}`;
  }

  limit() {
    const { limitValue, queryParameters } = this.query;
    if (!limitValue) return;

    this.uri += `${this.returnBaseUri(queryParameters.limit)}=${limitValue}`;
  }

  params() {
    const { paramsObj } = this.query;
    if (!paramsObj) return;

    this.uri += this.returnBaseUri(this.returnQsData(paramsObj));
  }

  // eslint-disable-next-line class-methods-use-this
  returnQsData(val) {
    return qs.stringify(val, { encode: false });
  }

  returnBaseUri(data) {
    return this.prepend() + data;
  }
}
