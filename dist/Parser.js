"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _qs = _interopRequireDefault(require("qs"));

var Parser =
/*#__PURE__*/
function () {
  function Parser(query) {
    (0, _classCallCheck2["default"])(this, Parser);
    this.query = query;
    this.uri = "";
  } // parse the final query string


  (0, _createClass2["default"])(Parser, [{
    key: "parse",
    value: function parse() {
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
  }, {
    key: "prepend",
    value: function prepend() {
      return this.uri === "" ? "?" : "&";
    }
    /**
     * Parsers
     */

  }, {
    key: "includes",
    value: function includes() {
      var _this$query = this.query,
          includes = _this$query.includes,
          queryParameters = _this$query.queryParameters;
      if (!includes.length > 0) return;
      this.uri += "".concat(this.prepend() + queryParameters.includes, "=").concat(includes);
    }
  }, {
    key: "appends",
    value: function appends() {
      var _this$query2 = this.query,
          appends = _this$query2.appends,
          queryParameters = _this$query2.queryParameters;
      if (!this.query.appends.length > 0) return;
      this.uri += "".concat(this.prepend() + queryParameters.appends, "=").concat(appends);
    }
  }, {
    key: "fields",
    value: function fields() {
      var _this$query3 = this.query,
          qFields = _this$query3.fields,
          queryParameters = _this$query3.queryParameters;
      if (!Object.keys(qFields).length) return;
      var fields = (0, _defineProperty2["default"])({}, queryParameters.fields, qFields);
      this.uri += this.prepend() + _qs["default"].stringify(fields, {
        encode: false
      });
    }
  }, {
    key: "filters",
    value: function filters() {
      var _this$query4 = this.query,
          fil = _this$query4.filters,
          queryParameters = _this$query4.queryParameters;
      if (!Object.keys(fil).length) return;
      var filters = (0, _defineProperty2["default"])({}, queryParameters.filters, fil);
      console.log("uri start, ", this.uri);
      console.log("this.prepend()", this.prepend());
      console.log("filters", filters);
      console.log("qs.stringify(filters, { encode: false })", _qs["default"].stringify(filters, {
        encode: false
      }));
      this.uri += this.prepend() + _qs["default"].stringify(filters, {
        encode: false
      });
      console.log("uri finish, ", this.uri);
    }
  }, {
    key: "sorts",
    value: function sorts() {
      var _this$query5 = this.query,
          sorts = _this$query5.sorts,
          queryParameters = _this$query5.queryParameters;
      if (!sorts.length) return;
      this.uri += "".concat(this.prepend() + queryParameters.sort, "=").concat(sorts);
    }
  }, {
    key: "page",
    value: function page() {
      if (this.query.pageValue === null) {
        return;
      }

      this.uri += "".concat(this.prepend() + this.query.queryParameters.page, "=").concat(this.query.pageValue);
    }
  }, {
    key: "limit",
    value: function limit() {
      if (this.query.limitValue === null) {
        return;
      }

      this.uri += "".concat(this.prepend() + this.query.queryParameters.limit, "=").concat(this.query.limitValue);
    }
  }, {
    key: "params",
    value: function params() {
      if (this.query.paramsObj === null) {
        return;
      }

      this.uri += this.prepend() + _qs["default"].stringify(this.query.paramsObj, {
        encode: false
      });
    }
  }]);
  return Parser;
}();

exports["default"] = Parser;