"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Utility class to convert the given params to opensearch query DSL
 */
var ElasticsearchUtils = /** @class */ (function () {
    function ElasticsearchUtils() {
    }
    /**
     * Convert a field and a value into Elasticsearch "match" expression.
     *
     * @param fieldName
     *    The operand that is indexed in Elasticsearch.
     * @param value
     *    The value in the expression.
     * @return
     *    The converted Elasticsearch expression. Returns null if fieldName is invalid.
     */
    ElasticsearchUtils.prototype.toEqExpression = function (fieldName, value) {
        if (!fieldName) {
            return null;
        }
        var updatedFieldName = typeof value === 'string' ? fieldName + '.keyword' : fieldName;
        return this.toMatchExpression(updatedFieldName, value);
    };
    /**
     * Convert a field and a value into Elasticsearch "match_phrase" expression.
     *
     * @param fieldName
     *    The operand that is indexed in Elasticsearch.
     * @param value
     *    The value in the expression.
     * @return
     *    The converted Elasticsearch expression. Returns null if fieldName is invalid.
     */
    ElasticsearchUtils.prototype.toNeExpression = function (fieldName, value) {
        if (!fieldName) {
            return null;
        }
        return this.toNotExpression(this.toEqExpression(fieldName, value));
    };
    /**
     * Convert a field and a value into Elasticsearch "match" expression.
     *
     * @param fieldName
     *    The operand that is indexed in Elasticsearch.
     * @param value
     *    The value in the expression.
     * @return
     *    The converted Elasticsearch expression. Returns null if fieldName is invalid.
     */
    ElasticsearchUtils.prototype.toMatchExpression = function (fieldName, value) {
        var _a, _b;
        if (!fieldName) {
            return null;
        }
        return _a = {},
            _a[ElasticsearchUtils.MATCH] = (_b = {},
                _b[fieldName] = value,
                _b),
            _a;
    };
    /**
     * Convert a field and a value into Elasticsearch "match_phrase" expression.
     *
     * @param fieldName
     *    The operand that is indexed in Elasticsearch.
     * @param value
     *    The value in the expression.
     * @return
     *    The converted Elasticsearch expression. Returns null if fieldName is invalid.
     */
    ElasticsearchUtils.prototype.toMatchPhraseExpression = function (fieldName, value) {
        var _a, _b;
        if (!fieldName) {
            return null;
        }
        return _a = {},
            _a[ElasticsearchUtils.MATCH_PHRASE] = (_b = {},
                _b[fieldName] = value,
                _b),
            _a;
    };
    /**
     * Convert a field and a value into Elasticsearch "match_phrase_prefix" expression.
     *
     * @param fieldName
     *    The operand that is indexed in Elasticsearch.
     * @param value
     *    The value in the expression.
     * @return
     *    The converted Elasticsearch expression. Returns null if fieldName is invalid.
     */
    ElasticsearchUtils.prototype.toMatchPhrasePrefixExpression = function (fieldName, value) {
        var _a, _b;
        if (!fieldName) {
            return null;
        }
        return _a = {},
            _a[ElasticsearchUtils.MATCH_PHRASE_PREFIX] = (_b = {},
                _b[fieldName] = value,
                _b),
            _a;
    };
    /**
     * Convert a field and a value into Elasticsearch "multi_match" expression.
     *
     * @param fieldName
     *    The operand that is indexed in Elasticsearch.
     * @param value
     *    The value in the expression.
     * @return
     *    The converted Elasticsearch expression. Returns null if fieldName is invalid.
     */
    ElasticsearchUtils.prototype.toMultiMatchExpression = function (fieldName, value) {
        var _a, _b;
        if (!fieldName) {
            return null;
        }
        return _a = {},
            _a[ElasticsearchUtils.MULTI_MATCH] = (_b = {},
                _b[fieldName] = value,
                _b),
            _a;
    };
    /**
     * Convert a field and a value into Elasticsearch "exists" expression.
     *
     * @param fieldName
     *    The operand that is indexed in Elasticsearch.
     * @param value
     *    The value in the expression.
     * @return
     *    The converted Elasticsearch expression. Returns null if fieldName is invalid.
     */
    ElasticsearchUtils.prototype.toExistsExpression = function (fieldName, value) {
        var _a, _b, _c, _d, _e, _f;
        if (!fieldName || typeof value !== 'boolean') {
            return null;
        }
        if (value) {
            return _a = {},
                _a[ElasticsearchUtils.EXISTS] = (_b = {},
                    _b[ElasticsearchUtils.FIELD] = fieldName,
                    _b),
                _a;
        }
        else {
            return _c = {},
                _c[ElasticsearchUtils.BOOL] = (_d = {},
                    _d[ElasticsearchUtils.MUST_NOT] = (_e = {},
                        _e[ElasticsearchUtils.EXISTS] = (_f = {},
                            _f[ElasticsearchUtils.FIELD] = fieldName,
                            _f),
                        _e),
                    _d),
                _c;
        }
    };
    /**
     * Convert a field and a value into Elasticsearch "wildcard" expression.
     *
     * @param fieldName
     *    The operand that is indexed in Elasticsearch.
     * @param value
     *    The value in the expression.
     * @return
     *    The converted Elasticsearch expression. Returns null if fieldName is invalid.
     */
    ElasticsearchUtils.prototype.toWildcardExpression = function (fieldName, value) {
        var _a, _b;
        if (!fieldName) {
            return null;
        }
        return _a = {},
            _a[ElasticsearchUtils.WILDCARD] = (_b = {},
                _b[fieldName] = value,
                _b),
            _a;
    };
    /**
     * Convert a field and a value into Elasticsearch "regexp" expression.
     *
     * @param fieldName
     *    The operand that is indexed in Elasticsearch.
     * @param value
     *    The value in the expression.
     * @return
     *    The converted Elasticsearch expression. Returns null if fieldName is invalid.
     */
    ElasticsearchUtils.prototype.toRegularExpression = function (fieldName, value) {
        var _a, _b;
        if (!fieldName) {
            return null;
        }
        return _a = {},
            _a[ElasticsearchUtils.REGEXP] = (_b = {},
                _b[fieldName] = value,
                _b),
            _a;
    };
    /**
     * Convert a field and a value into Elasticsearch "gt" expression.
     *
     * @param fieldName
     *    The operand that is indexed in Elasticsearch.
     * @param value
     *    The value in the expression.
     * @return
     *    The converted Elasticsearch expression. Returns null if fieldName is invalid.
     */
    ElasticsearchUtils.prototype.toGtExpression = function (fieldName, value) {
        var _a, _b, _c;
        if (!fieldName) {
            return null;
        }
        return _a = {},
            _a[ElasticsearchUtils.RANGE] = (_b = {},
                _b[fieldName] = (_c = {},
                    _c[ElasticsearchUtils.GT] = value,
                    _c),
                _b),
            _a;
    };
    /**
     * Convert a field and a value into Elasticsearch "gte" expression.
     *
     * @param fieldName
     *    The operand that is indexed in Elasticsearch.
     * @param value
     *    The value in the expression.
     * @return
     *    The converted Elasticsearch expression. Returns null if fieldName is invalid.
     */
    ElasticsearchUtils.prototype.toGteExpression = function (fieldName, value) {
        var _a, _b, _c;
        if (!fieldName) {
            return null;
        }
        return _a = {},
            _a[ElasticsearchUtils.RANGE] = (_b = {},
                _b[fieldName] = (_c = {},
                    _c[ElasticsearchUtils.GTE] = value,
                    _c),
                _b),
            _a;
    };
    /**
     * Convert a field and a value into Elasticsearch "lt" expression.
     *
     * @param fieldName
     *    The operand that is indexed in Elasticsearch.
     * @param value
     *    The value in the expression.
     * @return
     *    The converted Elasticsearch expression. Returns null if fieldName is invalid.
     */
    ElasticsearchUtils.prototype.toLTExpression = function (fieldName, value) {
        var _a, _b, _c;
        if (!fieldName) {
            return null;
        }
        return _a = {},
            _a[ElasticsearchUtils.RANGE] = (_b = {},
                _b[fieldName] = (_c = {},
                    _c[ElasticsearchUtils.LT] = value,
                    _c),
                _b),
            _a;
    };
    /**
     * Convert a field and a value into Elasticsearch "lte" expression.
     *
     * @param fieldName
     *    The operand that is indexed in Elasticsearch.
     * @param value
     *    The value in the expression.
     * @return
     *    The converted Elasticsearch expression. Returns null if fieldName is invalid.
     */
    ElasticsearchUtils.prototype.toLTEExpression = function (fieldName, value) {
        var _a, _b, _c;
        if (!fieldName) {
            return null;
        }
        return _a = {},
            _a[ElasticsearchUtils.RANGE] = (_b = {},
                _b[fieldName] = (_c = {},
                    _c[ElasticsearchUtils.LTE] = value,
                    _c),
                _b),
            _a;
    };
    /**
     * Convert a field and a value into Elasticsearch "range" expression.
     *  This will result in an inclusive range search query.
     *
     * @param fieldName
     *    The operand that is indexed in Elasticsearch.
     * @param start
     *    The lower value in the range expression.
     * @param end
     *    The higher value in the range expression.
     * @return
     *    The converted Elasticsearch expression. Returns null if fieldName is invalid.
     */
    ElasticsearchUtils.prototype.toRangeExpression = function (fieldName, start, end) {
        var _a, _b, _c;
        if (!fieldName) {
            return null;
        }
        return _a = {},
            _a[ElasticsearchUtils.RANGE] = (_b = {},
                _b[fieldName] = (_c = {},
                    _c[ElasticsearchUtils.GTE] = start,
                    _c[ElasticsearchUtils.LTE] = end,
                    _c),
                _b),
            _a;
    };
    /**
     * Convert a field and a value into Elasticsearch "AND" expression.
     *
     * @param filterClauses
     *    A list of filter clauses to be ANDed in Elasticsearch expression.
     * @return
     *    The converted Elasticsearch AND expression. Returns null if filterClauses is invalid.
     */
    ElasticsearchUtils.prototype.toAndExpression = function (filterClauses) {
        var _a, _b;
        if (!filterClauses || filterClauses.length == 0) {
            return null;
        }
        var andExpression = (_a = {},
            _a[ElasticsearchUtils.BOOL] = (_b = {},
                _b[ElasticsearchUtils.MUST] = filterClauses,
                _b),
            _a);
        return andExpression;
    };
    /**
     * Convert a field and a value into Elasticsearch "OR" expression.
     *
     * @param filterClauses
     *    A list of filter clauses to be ORed in Elasticsearch expression.
     * @return
     *    The converted Elasticsearch OR expression. Returns null if filterClauses is invalid.
     */
    ElasticsearchUtils.prototype.toOrExpression = function (filterClauses) {
        var _a, _b;
        if (!filterClauses || filterClauses.length == 0) {
            return null;
        }
        var andExpression = (_a = {},
            _a[ElasticsearchUtils.BOOL] = (_b = {},
                _b[ElasticsearchUtils.SHOULD] = filterClauses,
                _b[ElasticsearchUtils.MINIMUM_SHOULD_MATCH] = ElasticsearchUtils.ONE,
                _b),
            _a);
        return andExpression;
    };
    /**
     * Convert a field and a value into Elasticsearch "NOT" expression.
     *
     * @param expression
     *    A filter clause to be NOTed in Elasticsearch expression.
     * @return
     *    The converted Elasticsearch NOT expression. Returns null if expression is invalid.
     */
    ElasticsearchUtils.prototype.toNotExpression = function (expression) {
        var _a, _b;
        if (!expression) {
            return null;
        }
        var andExpression = (_a = {},
            _a[ElasticsearchUtils.BOOL] = (_b = {},
                _b[ElasticsearchUtils.MUST_NOT] = expression,
                _b),
            _a);
        return andExpression;
    };
    ElasticsearchUtils.ONE = 1;
    ElasticsearchUtils.BOOL = 'bool';
    ElasticsearchUtils.MUST = 'must';
    ElasticsearchUtils.MUST_NOT = 'must_not';
    ElasticsearchUtils.SHOULD = 'should';
    ElasticsearchUtils.MATCH = 'match';
    ElasticsearchUtils.MATCH_PHRASE = 'match_phrase';
    ElasticsearchUtils.MATCH_PHRASE_PREFIX = 'match_phrase_prefix';
    ElasticsearchUtils.MULTI_MATCH = 'multi_match';
    ElasticsearchUtils.EXISTS = 'exists';
    ElasticsearchUtils.WILDCARD = 'wildcard';
    ElasticsearchUtils.REGEXP = 'regexp';
    ElasticsearchUtils.RANGE = 'range';
    ElasticsearchUtils.GT = 'gt';
    ElasticsearchUtils.GTE = 'gte';
    ElasticsearchUtils.LT = 'lt';
    ElasticsearchUtils.LTE = 'lte';
    ElasticsearchUtils.MINIMUM_SHOULD_MATCH = 'minimum_should_match';
    ElasticsearchUtils.FIELD = 'field';
    return ElasticsearchUtils;
}());
exports.default = ElasticsearchUtils;
//# sourceMappingURL=elasticsearch-utils.js.map