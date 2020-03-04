"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Query = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Methods = require("./Methods");

var _config = require("./config");

var Query =
/*#__PURE__*/
function () {
  function Query(_ref) {
    var baseURL = _ref.baseURL,
        path = _ref.path,
        customConfig = _ref.customConfig,
        params = _ref.params;
    (0, _classCallCheck2["default"])(this, Query);
    this.defaultRow = "".concat(baseURL + path, "?");
    this.query = Object.keys(params).map(function (el) {
      return (0, _Methods.methods)({
        params: params[el],
        method: el,
        config: (0, _config.config)(customConfig)
      });
    });
  }

  (0, _createClass2["default"])(Query, [{
    key: "get",
    value: function get() {
      return "".concat(this.defaultRow, "?").concat(this.query.join("&"));
    }
  }]);
  return Query;
}();

exports.Query = Query;