/**
 * Utility class to convert the given params to opensearch query DSL
 */
declare class ElasticsearchUtils {
    private static readonly ONE;
    private static readonly BOOL;
    private static readonly MUST;
    private static readonly MUST_NOT;
    private static readonly SHOULD;
    private static readonly MATCH;
    private static readonly MATCH_PHRASE;
    private static readonly MATCH_PHRASE_PREFIX;
    private static readonly MULTI_MATCH;
    private static readonly EXISTS;
    private static readonly WILDCARD;
    private static readonly REGEXP;
    private static readonly RANGE;
    private static readonly GT;
    private static readonly GTE;
    private static readonly LT;
    private static readonly LTE;
    private static readonly MINIMUM_SHOULD_MATCH;
    private static readonly FIELD;
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
    toEqExpression(fieldName: string, value: any): any;
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
    toNeExpression(fieldName: string, value: any): any;
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
    toMatchExpression(fieldName: string, value: any): any;
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
    toMatchPhraseExpression(fieldName: string, value: any): any;
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
    toMatchPhrasePrefixExpression(fieldName: string, value: any): any;
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
    toMultiMatchExpression(fieldName: string, value: any): any;
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
    toExistsExpression(fieldName: string, value: boolean): any;
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
    toWildcardExpression(fieldName: string, value: any): any;
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
    toRegularExpression(fieldName: string, value: any): any;
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
    toGtExpression(fieldName: string, value: any): any;
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
    toGteExpression(fieldName: string, value: any): any;
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
    toLTExpression(fieldName: string, value: any): any;
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
    toLTEExpression(fieldName: string, value: any): any;
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
    toRangeExpression(fieldName: string, start: any, end: any): any;
    /**
     * Convert a field and a value into Elasticsearch "AND" expression.
     *
     * @param filterClauses
     *    A list of filter clauses to be ANDed in Elasticsearch expression.
     * @return
     *    The converted Elasticsearch AND expression. Returns null if filterClauses is invalid.
     */
    toAndExpression(filterClauses: any[]): any;
    /**
     * Convert a field and a value into Elasticsearch "OR" expression.
     *
     * @param filterClauses
     *    A list of filter clauses to be ORed in Elasticsearch expression.
     * @return
     *    The converted Elasticsearch OR expression. Returns null if filterClauses is invalid.
     */
    toOrExpression(filterClauses: any[]): any;
    /**
     * Convert a field and a value into Elasticsearch "NOT" expression.
     *
     * @param expression
     *    A filter clause to be NOTed in Elasticsearch expression.
     * @return
     *    The converted Elasticsearch NOT expression. Returns null if expression is invalid.
     */
    toNotExpression(expression: any): any;
}
export default ElasticsearchUtils;
