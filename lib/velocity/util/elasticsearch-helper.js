"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var elasticsearch_utils_1 = __importDefault(require("./elasticsearch-utils"));
var ElasticsearchHelper = /** @class */ (function () {
    function ElasticsearchHelper() {
    }
    // eslint-disable-next-line spellcheck/spell-checker
    /**
     * This method is used by the ModelTransformUtils.
     *
     * For Example, the following filter parameter:
     *
     * filter: {
     *   title: {
     *     eq: "hihihi",
     *     wildcard: "h*i"
     *   },
     *   upvotes: {
     *     gt: 5
     *   }
     * }
     *
     * will generate the following Elasticsearch Query DSL:
     *
     * {
     *   "bool":{
     *   "must":[
     *     {
     *     "range":{
           "upvotes":{
     *       "gt":5
     *       }
     *     }
     *     },
     *     {
     *     "bool":{
     *       "must":[
     *       {
     *         "term":{
     *         "title":"hihihi"
     *         }
     *       },
     *       {
     *         "wildcard":{
     *         "title":"h*i"
     *         }
     *       }
     *       ]
     *     }
     *     }
     *   ]
     *   }
     * }
     *
     * The default Operator is assumed to be `AND`.
     *
     * This will accept a FilterInput object, and return an Elasticsearch Query DSL Expression.
     * This FilterInput object is defined by the appsync-model-transform code,
     *  so this method is opinionated to follow this pattern.
     *
     * @param filterInput
     *    The FilterInput object.
     * @return
     *    The Elasticsearch Query DSL
     *
     */
    ElasticsearchHelper.prototype.getQueryDSL = function (filterInput) {
        var results = this.getQueryDSLRecursive(filterInput);
        return this.getOrAndSubexpressions(results);
    };
    ElasticsearchHelper.prototype.getScalarQueryDSL = function (fieldName, conditions) {
        var _this = this;
        var results = [];
        var keys = Object.keys(conditions);
        keys.forEach(function (key) {
            var condition = key;
            var value = conditions[key];
            if ('range' === condition) {
                if (value.length && value.length < 1) {
                    return;
                }
                results.push(ElasticsearchHelper.ES_UTILS.toRangeExpression(fieldName, value[0], value[1]));
                return;
            }
            switch (condition) {
                case 'eq':
                    results.push(ElasticsearchHelper.ES_UTILS.toEqExpression(fieldName, value));
                    break;
                case 'ne':
                    results.push(ElasticsearchHelper.ES_UTILS.toNeExpression(fieldName, value));
                    break;
                case 'match':
                    results.push(ElasticsearchHelper.ES_UTILS.toMatchExpression(fieldName, value));
                    break;
                case 'matchPhrase':
                    results.push(ElasticsearchHelper.ES_UTILS.toMatchPhraseExpression(fieldName, value));
                    break;
                case 'matchPhrasePrefix':
                    results.push(ElasticsearchHelper.ES_UTILS.toMatchPhrasePrefixExpression(fieldName, value));
                    break;
                case 'multiMatch':
                    results.push(ElasticsearchHelper.ES_UTILS.toMultiMatchExpression(fieldName, value));
                    break;
                case 'exists':
                    results.push(ElasticsearchHelper.ES_UTILS.toExistsExpression(fieldName, value));
                    break;
                case 'wildcard':
                    results.push(ElasticsearchHelper.ES_UTILS.toWildcardExpression(fieldName, value));
                    break;
                case 'regexp':
                    results.push(ElasticsearchHelper.ES_UTILS.toRegularExpression(fieldName, value));
                    break;
                case 'gt':
                    results.push(ElasticsearchHelper.ES_UTILS.toGtExpression(fieldName, value));
                    break;
                case 'gte':
                    results.push(ElasticsearchHelper.ES_UTILS.toGteExpression(fieldName, value));
                    break;
                case 'lt':
                    results.push(ElasticsearchHelper.ES_UTILS.toLTExpression(fieldName, value));
                    break;
                case 'lte':
                    results.push(ElasticsearchHelper.ES_UTILS.toLTEExpression(fieldName, value));
                    break;
                default:
                    throw new Error(_this.format(ElasticsearchHelper.ERROR_FORMAT, [condition, value]));
            }
        });
        return results;
    };
    ElasticsearchHelper.prototype.getQueryDSLRecursive = function (filterInputFields) {
        var _this = this;
        var results = [];
        var keys = Object.keys(filterInputFields);
        keys.forEach(function (key) {
            var values = filterInputFields[key];
            if (['and', 'or'].includes(key.toLowerCase())) {
                var subexpressions_1 = [];
                values.forEach(function (value) {
                    var siblingChildExpressions = _this.getQueryDSLRecursive(value);
                    subexpressions_1.push(_this.getOrAndSubexpressions(siblingChildExpressions));
                });
                if ('and' === key.toLowerCase()) {
                    results.push(ElasticsearchHelper.ES_UTILS.toAndExpression(subexpressions_1));
                }
                else {
                    results.push(ElasticsearchHelper.ES_UTILS.toOrExpression(subexpressions_1));
                }
            }
            else if ('not' === key.toLowerCase()) {
                var combinedDSLQuery = _this.getQueryDSLRecursive(values);
                results.push(ElasticsearchHelper.ES_UTILS.toNotExpression(_this.getOrAndSubexpressions(combinedDSLQuery)));
            }
            else {
                var combinedDSLQuery = _this.getScalarQueryDSL(key, values);
                results.push(_this.getOrAndSubexpressions(combinedDSLQuery));
            }
        });
        return results;
    };
    ElasticsearchHelper.prototype.getOrAndSubexpressions = function (subexpressions) {
        var size = subexpressions.length;
        if (size == 1) {
            return subexpressions[0];
        }
        else {
            return ElasticsearchHelper.ES_UTILS.toAndExpression(subexpressions);
        }
    };
    ElasticsearchHelper.prototype.format = function (format, args) {
        if (!args) {
            return '';
        }
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
    ElasticsearchHelper.ES_UTILS = new elasticsearch_utils_1.default();
    ElasticsearchHelper.ERROR_FORMAT = 'Could not construct an Elasticsearch Query DSL from {0} and {1}';
    return ElasticsearchHelper;
}());
exports.default = ElasticsearchHelper;
//# sourceMappingURL=elasticsearch-helper.js.map