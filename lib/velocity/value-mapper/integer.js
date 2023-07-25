"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaInteger = void 0;
var JavaInteger = /** @class */ (function () {
    function JavaInteger(val) {
        this.value = Math.trunc(val);
    }
    JavaInteger.prototype.valueOf = function () {
        return this.value;
    };
    JavaInteger.prototype.parseInt = function (val, radix) {
        if (radix === void 0) { radix = 10; }
        return new JavaInteger(Number.parseInt(val, +radix));
    };
    JavaInteger.prototype.toJSON = function () {
        return this.value;
    };
    JavaInteger.prototype.toString = function () {
        return String(this.value);
    };
    return JavaInteger;
}());
exports.JavaInteger = JavaInteger;
//# sourceMappingURL=integer.js.map