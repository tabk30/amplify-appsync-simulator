"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDataLoader = exports.addDataLoader = exports.getDataLoader = void 0;
var dynamo_db_1 = require("./dynamo-db");
var none_1 = require("./none");
var lambda_1 = require("./lambda");
var opensearch_1 = require("./opensearch");
var DATA_LOADER_MAP = new Map();
function getDataLoader(sourceType) {
    if (DATA_LOADER_MAP.has(sourceType)) {
        return DATA_LOADER_MAP.get(sourceType);
    }
    throw new Error("Unsupported data source type ".concat(sourceType));
}
exports.getDataLoader = getDataLoader;
function addDataLoader(sourceType, loader) {
    if (DATA_LOADER_MAP.has(sourceType)) {
        throw new Error("Data loader for source ".concat(sourceType, " is already registered"));
    }
    DATA_LOADER_MAP.set(sourceType, loader);
}
exports.addDataLoader = addDataLoader;
function removeDataLoader(sourceType) {
    return DATA_LOADER_MAP.delete(sourceType);
}
exports.removeDataLoader = removeDataLoader;
// add known data sources
// @ts-expect-error Type 'AppSyncSimulatorDataSourceConfig' is not assignable to type 'DynamoDBLoaderConfig'
addDataLoader("AMAZON_DYNAMODB" /* AppSyncSimulatorDataSourceType.DynamoDB */, dynamo_db_1.DynamoDBDataLoader);
addDataLoader("NONE" /* AppSyncSimulatorDataSourceType.None */, none_1.NoneDataLoader);
addDataLoader("AWS_LAMBDA" /* AppSyncSimulatorDataSourceType.Lambda */, lambda_1.LambdaDataLoader);
addDataLoader("AMAZON_ELASTICSEARCH" /* AppSyncSimulatorDataSourceType.OpenSearch */, opensearch_1.OpenSearchDataLoader);
//# sourceMappingURL=index.js.map