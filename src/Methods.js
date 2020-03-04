export const methods = ({ params, method, config }) => {
  const include = () => {
    // params: arr of string
    if (!params || (!Array.isArray(params) && params.length)) {
      throw new Error(
        "INCLUDE method error!! args of include method must be array, with min length === 1"
      );
    }
    return `${config[method]}=${params.flat()}`;
  };

  const where = () => {
    if (!params || Array.isArray(params) || !(params instanceof Object)) {
      throw new Error(
        "WHERE method error!! args of include method must be an object, where the key is the string, that will be passed to the filter parameter, value is an array of filters args"
      );
    }

    if (!Object.values(params)[0].length) {
      throw new Error(
        "WHERE method error!! value in params object is an array of filters args, thsts length must be > 0"
      );
    }

    const keys = Object.keys(params);
    let query = keys.map(el => {
      return `[${el}]=${params[el].flat()}`;
    });

    if (query.length > 1) {
      query = query.join(`&${config[method]}`);
    }
    return `${config[method]}${query}`;
  };

  const related = () => {
    if (!params || (!Array.isArray(params) && !params.length)) {
      throw new Error(
        "RELATED method error!! params must be an array of objects, where all keys besides -value- must be string, value its an array width filter params"
      );
    }
    const row = params
      .map(el => {
        const keys = Object.keys(el);
        const rowArr = keys
          .map(key => {
            if (key !== "value") {
              return `[${el[key]}]`;
            }
            return null;
          })
          .filter(key => key);

        const dataKeys = `${rowArr.flat()}=`.replace(/[\s.,%]/g, "");
        return `${dataKeys}${el.value.flat()}`;
      })
      .join(`&${config[method]}`);

    return row;
  };

  const select = () => {
    if (!params || (!Array.isArray(params) && params.length)) {
      throw new Error(
        "SELECT method error args of include method must be array, with min length === 1"
      );
    }
    return `${config[method]}=${params.flat()}`;
  };

  const append = () => {
    if (!params || (!Array.isArray(params) && params.length)) {
      throw new Error(
        "APPEND method error!! args of include method must be array, with min length === 1"
      );
    }
    return `${config[method]}=${params.flat()}`;
  };

  const sort = () => {
    if (!params || (!Array.isArray(params) && params.length)) {
      throw new Error(
        "SORT method error!! args of include method must be array, with min length === 1"
      );
    }
    return `${config[method]}=${params.flat()}`;
  };

  const limit = () => {
    if (!params || typeof params !== "number") {
      throw new Error(
        "LIMIT method error!! args of include method must be a number"
      );
    }
    return `${config[method]}=${params}`;
  };

  const page = () => {
    if (!params || typeof params !== "number") {
      throw new Error(
        "PAGE method error!! args of include method must be a number"
      );
    }
    return `${config[method]}=${params}`;
  };

  const withoutConstrains = () => {
    if (!params || typeof params !== "boolean") {
      throw new Error(
        "CONSTRAIN method error!! args of include method must be a boolean"
      );
    }
    return `${config[method]}=${params}`;
  };

  const data = {
    include,
    where,
    related,
    select,
    append,
    sort,
    limit,
    page,
    withoutConstrains
  }[method];

  return data();
};
