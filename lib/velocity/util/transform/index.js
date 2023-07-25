"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformUtils = void 0;
var dynamodb_filter_1 = require("./dynamodb-filter");
var elasticsearch_helper_1 = __importDefault(require("../elasticsearch-helper"));
var amplify_prompts_1 = require("@aws-amplify/amplify-prompts");
exports.transformUtils = {
    toDynamoDBConditionExpression: function (condition) {
        var result = (0, dynamodb_filter_1.generateFilterExpression)(condition.toJSON());
        return JSON.stringify({
            expression: result.expressions.join(' ').trim(),
            expressionNames: result.expressionNames,
        });
    },
    toDynamoDBFilterExpression: function (filter) {
        var result = (0, dynamodb_filter_1.generateFilterExpression)(filter.toJSON());
        return JSON.stringify({
            expression: result.expressions.join(' ').trim(),
            expressionNames: result.expressionNames,
            expressionValues: result.expressionValues,
        });
    },
    toElasticsearchQueryDSL: function (filter) {
        var elasticsearchHelper = new elasticsearch_helper_1.default();
        if (!filter) {
            return null;
        }
        try {
            var queryDSL = elasticsearchHelper.getQueryDSL(filter.toJSON());
            return JSON.stringify(queryDSL);
        }
        catch (err) {
            amplify_prompts_1.printer.error('Error when constructing the Elasticsearch Query DSL using the model transform utils. {}');
            return null;
        }
    },
};
//# sourceMappingURL=index.js.map