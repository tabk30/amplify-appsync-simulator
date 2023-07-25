"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaArray = void 0;
var integer_1 = require("./integer");
var to_json_1 = require("./to-json");
var JavaArray = /** @class */ (function (_super) {
    __extends(JavaArray, _super);
    // eslint-disable-next-line @typescript-eslint/ban-types
    function JavaArray(values, mapper) {
        if (values === void 0) { values = []; }
        var _this = this;
        if (!Array.isArray(values)) {
            // splice sends a single object
            values = [values];
        }
        if (values.length !== 1) {
            _this = _super.apply(this, values) || this;
        }
        else {
            _this = _super.call(this) || this;
            _this.push(values[0]);
        }
        Object.setPrototypeOf(_this, Object.create(JavaArray.prototype));
        _this.mapper = mapper;
        return _this;
    }
    JavaArray.prototype.add = function (value) {
        this.push(this.mapper(value));
        return value;
    };
    JavaArray.prototype.addAll = function (value) {
        var _this = this;
        value.forEach(function (val) { return _this.push(_this.mapper(val)); });
    };
    JavaArray.prototype.clear = function () {
        this.length = 0;
    };
    JavaArray.prototype.contains = function (value) {
        value = value && value.toJSON ? value.toJSON() : value;
        return this.toJSON().indexOf(value) !== -1;
    };
    JavaArray.prototype.containsAll = function (value) {
        var _this = this;
        if (value === void 0) { value = []; }
        return value.every(function (v) { return _this.contains(v); });
    };
    JavaArray.prototype.isEmpty = function () {
        return this.length === 0;
    };
    JavaArray.prototype.remove = function (value) {
        var idx = this.indexOf(value);
        if (idx === -1)
            return;
        this.splice(idx, 1);
    };
    JavaArray.prototype.removeAll = function (value) {
        var _this = this;
        value.forEach(function (val) { return _this.remove(val); });
    };
    JavaArray.prototype.retainAll = function () {
        throw new Error('no support for retain all');
    };
    JavaArray.prototype.size = function () {
        return new integer_1.JavaInteger(this.length);
    };
    JavaArray.prototype.toJSON = function () {
        return Array.from(this).map(to_json_1.toJSON);
    };
    JavaArray.prototype.indexOf = function (obj) {
        var _a, _b;
        var value = (obj === null || obj === void 0 ? void 0 : obj.toJSON) ? obj.toJSON() : obj;
        for (var i = 0; i < this.length; i++) {
            var item = ((_a = this[i]) === null || _a === void 0 ? void 0 : _a.toJson) ? (_b = this[i]) === null || _b === void 0 ? void 0 : _b.toJson() : this[i];
            if (item === value) {
                return i;
            }
        }
        return -1;
    };
    return JavaArray;
}(Array));
exports.JavaArray = JavaArray;
//# sourceMappingURL=array.js.map