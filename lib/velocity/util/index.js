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
exports.create = exports.ValidateError = exports.Unauthorized = exports.TemplateSentError = void 0;
var errors_1 = require("./errors");
Object.defineProperty(exports, "TemplateSentError", { enumerable: true, get: function () { return errors_1.TemplateSentError; } });
Object.defineProperty(exports, "Unauthorized", { enumerable: true, get: function () { return errors_1.Unauthorized; } });
Object.defineProperty(exports, "ValidateError", { enumerable: true, get: function () { return errors_1.ValidateError; } });
var general_utils_1 = require("./general-utils");
var dynamodb_utils_1 = require("./dynamodb-utils");
var list_utils_1 = require("./list-utils");
var map_utils_1 = require("./map-utils");
var auth_utils_1 = require("./auth-utils");
var transform_1 = require("./transform");
var time_1 = require("./time");
var rds_1 = require("./rds");
var str_1 = require("./str");
var math_1 = require("./math");
function create(errors, now, info, context) {
    if (errors === void 0) { errors = []; }
    if (now === void 0) { now = new Date(); }
    return __assign(__assign(__assign({}, (0, auth_utils_1.authUtils)(context)), general_utils_1.generalUtils), { dynamodb: dynamodb_utils_1.dynamodbUtils, list: list_utils_1.listUtils, map: map_utils_1.mapUtils, transform: transform_1.transformUtils, now: now, errors: errors, info: info, time: (0, time_1.time)(), str: str_1.str, math: math_1.math, rds: rds_1.rds });
}
exports.create = create;
//# sourceMappingURL=index.js.map