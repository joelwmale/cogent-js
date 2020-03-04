"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var config = function config(customMethods) {
  return (0, _objectSpread2["default"])({
    where: "filter",
    related: "filter",
    select: "fields",
    include: "include",
    append: "append",
    page: "page",
    limit: "limit",
    sort: "sort",
    withoutConstrains: "without_constrains"
  }, customMethods);
};

exports.config = config;