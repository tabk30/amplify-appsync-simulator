declare class ElasticsearchHelper {
    private static readonly ES_UTILS;
    private static readonly ERROR_FORMAT;
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
    getQueryDSL(filterInput: any): any;
    getScalarQueryDSL(fieldName: string, conditions: any): any[];
    private getQueryDSLRecursive;
    private getOrAndSubexpressions;
    private format;
}
export default ElasticsearchHelper;
