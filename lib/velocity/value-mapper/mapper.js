"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = void 0;
var map_1 = require("./map");
var array_1 = require("./array");
var decimal_1 = require("./decimal");
var integer_1 = require("./integer");
var string_1 = require("./string");
var lodash_1 = require("lodash");
function map(value, hint) {
    if (value instanceof map_1.JavaMap)
        return value;
    if (value instanceof array_1.JavaArray)
        return value;
    if (Array.isArray(value)) {
        return new array_1.JavaArray(value.map(function (x) { return map(x); }), map);
    }
    if ((0, lodash_1.isPlainObject)(value)) {
        return (0, map_1.createMapProxy)(new map_1.JavaMap(Object.entries(value).reduce(function (sum, _a) {
            var _b;
            var k = _a[0], v = _a[1];
            return __assign(__assign({}, sum), (_b = {}, _b[k] = map(v), _b));
        }, {}), map));
    }
    // eslint-disable-next-line
    if (typeof value === 'string' && !(value instanceof string_1.JavaString)) {
        // eslint-disable-next-line
        return new string_1.JavaString(value);
    }
    if (typeof value === 'number') {
        // VTL treats integers differently from floats, but JavaScript number primitives are all doubles.
        // This means we can't really differentiate between 1 and 1.0 in mock. We can rely on hints from the
        // VTL parser though. If a hint was not provided, then we can try to guess using Math.trunc().
        if (hint === 'integer' || (hint !== 'decimal' && Math.trunc(value) === value)) {
            return new integer_1.JavaInteger(value);
        }
        return new decimal_1.JavaDecimal(value);
    }
    return value;
}
exports.map = map;
//# sourceMappingURL=mapper.js.map