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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFilterExpression = void 0;
var dynamodb_utils_1 = require("../dynamodb-utils");
var OPERATOR_MAP = {
    ne: '<>',
    eq: '=',
    lt: '<',
    le: '<=',
    gt: '>',
    ge: '>=',
    in: 'contains',
};
var FUNCTION_MAP = {
    contains: 'contains',
    notContains: 'NOT contains',
    beginsWith: 'begins_with',
};
function generateFilterExpression(filter, prefix, parent) {
    if (prefix === void 0) { prefix = null; }
    if (parent === void 0) { parent = null; }
    var expr = Object.entries(filter).reduce(function (sum, _a) {
        var name = _a[0], value = _a[1];
        var subExpr = {
            expressions: [],
            expressionNames: {},
            expressionValues: {},
        };
        var fieldName = createExpressionFieldName(parent);
        var filedValueName = createExpressionValueName(parent, name, prefix);
        switch (name) {
            case 'or':
            case 'and': {
                var JOINER_1 = name === 'or' ? 'OR' : 'AND';
                if (Array.isArray(value)) {
                    subExpr = scopeExpression(value.reduce(function (expr, subFilter, idx) {
                        var newExpr = generateFilterExpression(subFilter, [prefix, name, idx].filter(function (i) { return i !== null; }).join('_'));
                        return merge(expr, newExpr, JOINER_1);
                    }, subExpr));
                }
                else {
                    subExpr = generateFilterExpression(value, [prefix, name].filter(function (val) { return val !== null; }).join('_'));
                }
                break;
            }
            case 'not': {
                subExpr = scopeExpression(generateFilterExpression(value, [prefix, name].filter(function (val) { return val !== null; }).join('_')));
                subExpr.expressions.unshift('NOT');
                break;
            }
            case 'between': {
                var expr1 = createExpressionValueName(parent, 'between_1', prefix);
                var expr2 = createExpressionValueName(parent, 'between_2', prefix);
                var exprName = createExpressionName(parent);
                var subExprExpr = "".concat(createExpressionFieldName(parent), " BETWEEN ").concat(expr1, " AND ").concat(expr2);
                var exprValues = __assign(__assign({}, createExpressionValue(parent, 'between_1', value[0], prefix)), createExpressionValue(parent, 'between_2', value[1], prefix));
                subExpr = {
                    expressions: [subExprExpr],
                    expressionNames: exprName,
                    expressionValues: exprValues,
                };
                break;
            }
            case 'ne':
            case 'eq':
            case 'gt':
            case 'ge':
            case 'lt':
            case 'le': {
                var operator = OPERATOR_MAP[name];
                subExpr = {
                    expressions: ["".concat(fieldName, " ").concat(operator, " ").concat(filedValueName)],
                    expressionNames: createExpressionName(parent),
                    expressionValues: createExpressionValue(parent, name, value, prefix),
                };
                break;
            }
            case 'attributeExists': {
                var existsName = value === true ? 'attribute_exists' : 'attribute_not_exists';
                subExpr = {
                    expressions: ["".concat(existsName, "(").concat(fieldName, ")")],
                    expressionNames: createExpressionName(parent),
                    expressionValues: createExpressionValue(parent, name, value, prefix),
                };
                break;
            }
            case 'contains':
            case 'notContains':
            case 'beginsWith': {
                var functionName = FUNCTION_MAP[name];
                subExpr = {
                    expressions: ["".concat(functionName, "(").concat(fieldName, ", ").concat(filedValueName, ")")],
                    expressionNames: createExpressionName(parent),
                    expressionValues: createExpressionValue(parent, name, value, prefix),
                };
                break;
            }
            case 'in': {
                var operatorName = OPERATOR_MAP[name];
                subExpr = {
                    expressions: ["".concat(operatorName, "(").concat(filedValueName, ", ").concat(fieldName, ")")],
                    expressionNames: createExpressionName(parent),
                    expressionValues: createExpressionValue(parent, name, value, prefix),
                };
                break;
            }
            default:
                subExpr = scopeExpression(generateFilterExpression(value, prefix, name));
        }
        return merge(sum, subExpr);
    }, {
        expressions: [],
        expressionNames: {},
        expressionValues: {},
    });
    return expr;
}
exports.generateFilterExpression = generateFilterExpression;
function merge(expr1, expr2, joinCondition) {
    if (joinCondition === void 0) { joinCondition = 'AND'; }
    if (!expr2.expressions.length) {
        return expr1;
    }
    return {
        expressions: __spreadArray(__spreadArray(__spreadArray([], expr1.expressions, true), [expr1.expressions.length ? joinCondition : ''], false), expr2.expressions, true),
        expressionNames: __assign(__assign({}, expr1.expressionNames), expr2.expressionNames),
        expressionValues: __assign(__assign({}, expr1.expressionValues), expr2.expressionValues),
    };
}
function createExpressionValueName(fieldName, op, prefix) {
    return ":".concat([prefix, fieldName, op].filter(function (name) { return name; }).join('_'));
}
function createExpressionName(fieldName) {
    var _a;
    return _a = {},
        _a[createExpressionFieldName(fieldName)] = fieldName,
        _a;
}
function createExpressionFieldName(fieldName) {
    return "#".concat(fieldName);
}
function createExpressionValue(fieldName, op, value, prefix) {
    var _a;
    var exprName = createExpressionValueName(fieldName, op, prefix);
    var exprValue = dynamodb_utils_1.dynamodbUtils.toDynamoDB(value);
    return _a = {},
        _a["".concat(exprName)] = exprValue,
        _a;
}
function scopeExpression(expr) {
    var result = __assign({}, expr);
    result.expressions = result.expressions.filter(function (e) { return !!e; });
    if (result.expressions.length > 1) {
        result.expressions = ['(' + result.expressions.join(' ') + ')'];
    }
    return result;
}
//# sourceMappingURL=dynamodb-filter.js.map