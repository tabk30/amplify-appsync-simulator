"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSchemaWithDirectives = exports.getDirectiveTypeDefs = void 0;
var auth_1 = require("./auth");
var aws_subscribe_1 = require("./aws-subscribe");
var getDirectiveTypeDefs = function () {
    return [(0, auth_1.getAuthDirectives)(), (0, aws_subscribe_1.getAwsSubscribeDirective)()].join('\n');
};
exports.getDirectiveTypeDefs = getDirectiveTypeDefs;
var transformSchemaWithDirectives = function (schema, context) {
    var authDirectiveTransformer = (0, auth_1.getAuthDirectiveTransformer)(context);
    var awsSubscribeDirectiveTransformer = (0, aws_subscribe_1.getAwsSubscribeDirectiveTransformer)(context);
    return authDirectiveTransformer(awsSubscribeDirectiveTransformer(schema));
};
exports.transformSchemaWithDirectives = transformSchemaWithDirectives;
//# sourceMappingURL=index.js.map