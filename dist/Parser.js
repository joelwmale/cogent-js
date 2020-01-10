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
      this.related();
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
      if (!includes.length) return;
      this.uri += "".concat(this.returnBaseUri(queryParameters.includes), "=").concat(includes);
    }
  }, {
    key: "appends",
    value: function appends() {
      var _this$query2 = this.query,
          appends = _this$query2.appends,
          queryParameters = _this$query2.queryParameters;
      if (!appends.length) return;
      this.uri += "".concat(this.returnBaseUri(queryParameters.appends), "=").concat(appends);
    }
  }, {
    key: "fields",
    value: function fields() {
      var _this$query3 = this.query,
          qFields = _this$query3.fields,
          queryParameters = _this$query3.queryParameters;
      if (!Object.keys(qFields).length) return;
      var fields = (0, _defineProperty2["default"])({}, queryParameters.fields, qFields);
      this.uri += this.returnBaseUri(this.returnQsData(fields));
    }
  }, {
    key: "filters",
    value: function filters() {
      var _this$query4 = this.query,
          fil = _this$query4.filters,
          queryParameters = _this$query4.queryParameters;
      if (!Object.keys(fil).length) return;
      var filters = (0, _defineProperty2["default"])({}, queryParameters.filters, fil);
      var filterPath = this.returnQsData(filters);
      this.uri += this.returnBaseUri(filterPath);
    }
  }, {
    key: "related",
    value: function related() {
      var _this$query5 = this.query,
          fil = _this$query5.relatedFilter,
          related = _this$query5.related,
          queryParameters = _this$query5.queryParameters;
      if (!Object.keys(related).length) return; // since all the magic happens in
      // qs (qs.stringify(filters, { encode: false });),
      // and I don’t have any desire to fork it and rewrite (rofl)
      // we insert such a castil

      var newFil = {};
      var keys = Object.keys(fil);
      keys.forEach(function (el) {
        if (related[el]) {
          newFil[el + "][" + related[el]] = fil[el]; // eslint-disable-line
        }
      });
      var filters = (0, _defineProperty2["default"])({}, queryParameters.filters, newFil);
      var filterPath = this.returnQsData(filters);
      this.uri += this.returnBaseUri(filterPath);
    }
  }, {
    key: "sorts",
    value: function sorts() {
      var _this$query6 = this.query,
          sorts = _this$query6.sorts,
          queryParameters = _this$query6.queryParameters;
      if (!sorts.length) return;
      this.uri += "".concat(this.returnBaseUri(queryParameters.sort), "=").concat(sorts);
    }
  }, {
    key: "page",
    value: function page() {
      var _this$query7 = this.query,
          pageValue = _this$query7.pageValue,
          queryParameters = _this$query7.queryParameters;
      if (!pageValue) return;
      this.uri += "".concat(this.returnBaseUri(queryParameters.page), "=").concat(pageValue);
    }
  }, {
    key: "limit",
    value: function limit() {
      var _this$query8 = this.query,
          limitValue = _this$query8.limitValue,
          queryParameters = _this$query8.queryParameters;
      if (!limitValue) return;
      this.uri += "".concat(this.returnBaseUri(queryParameters.limit), "=").concat(limitValue);
    }
  }, {
    key: "params",
    value: function params() {
      var paramsObj = this.query.paramsObj;
      if (!paramsObj) return;
      this.uri += this.returnBaseUri(this.returnQsData(paramsObj));
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "returnQsData",
    value: function returnQsData(val) {
      return _qs["default"].stringify(val, {
        encode: false
      });
    }
  }, {
    key: "returnBaseUri",
    value: function returnBaseUri(data) {
      return this.prepend() + data;
    }
  }]);
  return Parser;
}();

exports["default"] = Parser;