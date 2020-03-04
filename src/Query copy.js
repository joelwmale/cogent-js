import { methods } from "./Methods";
import { config } from "./config";

export class Query {
  constructor({ baseURL, path, customConfig, params }) {
    this.defaultRow = `${baseURL + path}?`;

    this.query = Object.keys(params).map(el => {
      return methods({
        params: params[el],
        method: el,
        config: config(customConfig)
      });
    });
  }

  get() {
    return `${this.defaultRow}?${this.query.join("&")}`;
  }
}
