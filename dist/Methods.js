"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = void 0;

var methods = function methods(_ref) {
  var params = _ref.params,
      method = _ref.method,
      config = _ref.config;

  var include = function include() {
    // params: arr of string
    if (!params || !Array.isArray(params) && params.length) {
      throw new Error("INCLUDE method error!! args of include method must be array, with min length === 1");
    }

    return "".concat(config[method], "=").concat(params.flat());
  };

  var where = function where() {
    if (!params || Array.isArray(params) || !(params instanceof Object)) {
      throw new Error("WHERE method error!! args of include method must be an object, where the key is the string, that will be passed to the filter parameter, value is an array of filters args");
    }

    if (!Object.values(params)[0].length) {
      throw new Error("WHERE method error!! value in params object is an array of filters args, thsts length must be > 0");
    }

    var keys = Object.keys(params);
    var query = keys.map(function (el) {
      return "[".concat(el, "]=").concat(params[el].flat());
    });

    if (query.length > 1) {
      query = query.join("&".concat(config[method]));
    }

    return "".concat(config[method]).concat(query);
  };

  var related = function related() {
    if (!params || !Array.isArray(params) && !params.length) {
      throw new Error("RELATED method error!! params must be an array of objects, where all keys besides -value- must be string, value its an array width filter params");
    }

    var row = params.map(function (el) {
      var keys = Object.keys(el);
      var rowArr = keys.map(function (key) {
        if (key !== "value") {
          return "[".concat(el[key], "]");
        }

        return null;
      }).filter(function (key) {
        return key;
      });
      var dataKeys = "".concat(rowArr.flat(), "=").replace(/[\s.,%]/g, "");
      return "".concat(dataKeys).concat(el.value.flat());
    }).join("&".concat(config[method]));
    return row;
  };

  var select = function select() {
    if (!params || !Array.isArray(params) && params.length) {
      throw new Error("SELECT method error args of include method must be array, with min length === 1");
    }

    return "".concat(config[method], "=").concat(params.flat());
  };

  var append = function append() {
    if (!params || !Array.isArray(params) && params.length) {
      throw new Error("APPEND method error!! args of include method must be array, with min length === 1");
    }

    return "".concat(config[method], "=").concat(params.flat());
  };

  var sort = function sort() {
    if (!params || !Array.isArray(params) && params.length) {
      throw new Error("SORT method error!! args of include method must be array, with min length === 1");
    }

    return "".concat(config[method], "=").concat(params.flat());
  };

  var limit = function limit() {
    if (!params || typeof params !== "number") {
      throw new Error("LIMIT method error!! args of include method must be a number");
    }

    return "".concat(config[method], "=").concat(params);
  };

  var page = function page() {
    if (!params || typeof params !== "number") {
      throw new Error("PAGE method error!! args of include method must be a number");
    }

    return "".concat(config[method], "=").concat(params);
  };

  var withoutConstrains = function withoutConstrains() {
    if (!params || typeof params !== "boolean") {
      throw new Error("CONSTRAIN method error!! args of include method must be a boolean");
    }

    return "".concat(config[method], "=").concat(params);
  };

  var data = {
    include: include,
    where: where,
    related: related,
    select: select,
    append: append,
    sort: sort,
    limit: limit,
    page: page,
    withoutConstrains: withoutConstrains
  }[method];
  return data();
};

exports.methods = methods;