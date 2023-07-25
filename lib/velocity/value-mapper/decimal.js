"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaDecimal = void 0;
var JavaDecimal = /** @class */ (function () {
    function JavaDecimal(val) {
        this.value = val;
    }
    JavaDecimal.prototype.valueOf = function () {
        return this.value;
    };
    JavaDecimal.prototype.toJSON = function () {
        return this.value;
    };
    JavaDecimal.prototype.toString = function () {
        return String(this.value);
    };
    return JavaDecimal;
}());
exports.JavaDecimal = JavaDecimal;
//# sourceMappingURL=decimal.js.map