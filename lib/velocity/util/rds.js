"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rds = void 0;
var serializeRdsObject = function (rdsObject) {
    var _a;
    return ((_a = rdsObject === null || rdsObject === void 0 ? void 0 : rdsObject.sqlStatementResults) !== null && _a !== void 0 ? _a : []).map(function (statement) {
        var _a;
        return ((_a = statement === null || statement === void 0 ? void 0 : statement.records) !== null && _a !== void 0 ? _a : []).map(function (record) {
            var result = {};
            record.forEach(function (row, index) {
                var _a, _b, _c;
                result[(_b = (_a = statement === null || statement === void 0 ? void 0 : statement.columnMetadata) === null || _a === void 0 ? void 0 : _a[index]) === null || _b === void 0 ? void 0 : _b.name] = row['isNull'] || row['null'] ? null : (_c = Object.values(row)) === null || _c === void 0 ? void 0 : _c[0];
            });
            return result;
        });
    });
};
exports.rds = {
    toJsonString: function (rdsObject) {
        try {
            rdsObject = JSON.parse(rdsObject);
            var rdsJson = serializeRdsObject(rdsObject);
            return JSON.stringify(rdsJson);
        }
        catch (_a) {
            return '';
        }
    },
    toJsonObject: function (rdsString) {
        try {
            var rdsObject = JSON.parse(rdsString);
            return serializeRdsObject(rdsObject);
        }
        catch (_a) {
            return '';
        }
    },
};
//# sourceMappingURL=rds.js.map