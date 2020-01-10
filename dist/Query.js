"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Parser = _interopRequireDefault(require("./Parser"));

var Query =
/*#__PURE__*/
function () {
  function Query() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Query);
    // @TODO validate options is an object
    // if (options && typeof(options) !== Object) {
    //   throw new Error('Please pass in an options object to the constructor.');
    // }
    // the model to execute the query against
    // set by calling .for(model)
    this.model = null; // will use base_url if passed in

    this.base_url = options.base_url || null; // default filter names

    this.queryParameters = options.queryParameters || {
      filters: "filter",
      related: "filter",
      relatedFilter: "filter",
      fields: "fields",
      includes: "include",
      appends: "append",
      page: "page",
      limit: "limit",
      sort: "sort"
    }; // initialise variables to hold
    // the urls data

    this.includes = [];
    this.appends = [];
    this.sorts = [];
    this.fields = {};
    this.filters = {};
    this.related = {};
    this.relatedFilter = {};
    this.pageValue = null;
    this.limitValue = null;
    this.paramsObj = null;
    this.parser = new _Parser["default"](this);
  } // set the model for the query


  (0, _createClass2["default"])(Query, [{
    key: "for",
    value: function _for(model) {
      if (typeof model === "string") this.model = model;
      return this;
    } // return the parsed url

  }, {
    key: "get",
    value: function get() {
      // generate the url
      var url = this.base_url ? this.base_url + this.parseQuery() : this.parseQuery(); // reset the url so the query object can be re-used

      this.reset();
      return url;
    }
  }, {
    key: "url",
    value: function url() {
      return this.get();
    }
  }, {
    key: "reset",
    value: function reset() {
      // reset the uri
      this.parser.uri = "";
    }
  }, {
    key: "parseQuery",
    value: function parseQuery() {
      if (!this.model) {
        throw new Error("Please call the for() method before adding filters or calling url() / get().");
      }

      return "/".concat(this.model).concat(this.parser.parse());
    }
    /**
     * Query builder
     */

  }, {
    key: "include",
    value: function include() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.includes = args;
      return this;
    }
  }, {
    key: "append",
    value: function append() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.appends = args;
      return this;
    }
  }, {
    key: "select",
    value: function select() {
      var _this = this;

      for (var _len3 = arguments.length, fields = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        fields[_key3] = arguments[_key3];
      }

      if (fields.length === 0) {
        throw new Error("The fields() function takes a single argument of an array.");
      } // single entity .fields(['age', 'firstname'])


      if (fields[0].constructor === String || Array.isArray(fields[0])) {
        this.fields = fields.join(",");
      } // related entities .fields({ posts: ['title', 'content'], user: ['age', 'firstname']} )


      if (fields[0].constructor === Object) {
        Object.entries(fields[0]).forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          _this.fields[key] = value.join(",");
        });
      }

      return this;
    }
  }, {
    key: "where",
    value: function where(key, value) {
      if (key === undefined || value === undefined) throw new Error("The where() function takes 2 arguments both of string values.");
      if (Array.isArray(value) || value instanceof Object) throw new Error("The second argument to the where() function must be a string. Use whereIn() if you need to pass in an array.");
      this.filters[key] = value;
      return this;
    }
  }, {
    key: "whereIn",
    value: function whereIn(key, array) {
      if (!Array.isArray(array)) throw new Error("The second argument to the whereIn() function must be an array.");
      this.filters[key] = array.join(",");
      return this;
    }
  }, {
    key: "whereRelated",
    value: function whereRelated(key, related, value) {
      if (!key || !value) throw new Error("The where() function takes 3 arguments both of string values.");
      if (Array.isArray(value) || value instanceof Object) throw new Error("The second argument to the where() function must be a string. Use whereIn() if you need to pass in an array.");
      this.relatedFilter[key] = value;
      this.related[key] = related;
      return this;
    }
  }, {
    key: "whereInRelated",
    value: function whereInRelated(key, related, array) {
      if (!Array.isArray(array)) throw new Error("The second argument to the whereIn() function must be an array.");
      this.relatedFilter[key] = array.join(",");
      this.related[key] = related;
      return this;
    }
  }, {
    key: "sort",
    value: function sort() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.sorts = args;
      return this;
    }
  }, {
    key: "page",
    value: function page(value) {
      if (!Number.isInteger(value)) {
        throw new Error("The page() function takes a single argument of a number");
      }

      this.pageValue = value;
      return this;
    }
  }, {
    key: "limit",
    value: function limit(value) {
      if (!Number.isInteger(value)) {
        throw new Error("The limit() function takes a single argument of a number.");
      }

      this.limitValue = value;
      return this;
    }
  }, {
    key: "params",
    value: function params(_params) {
      if (_params === undefined || _params.constructor !== Object) {
        throw new Error("The params() function takes a single argument of an object.");
      }

      this.paramsObj = _params;
      return this;
    }
  }]);
  return Query;
}();

exports["default"] = Query;