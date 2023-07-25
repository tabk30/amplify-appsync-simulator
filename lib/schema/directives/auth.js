"use strict";
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
exports.getAuthDirectives = exports.getAuthDirectiveTransformer = void 0;
var graphql_1 = require("graphql");
var utils_1 = require("@graphql-tools/utils");
var type_definition_1 = require("../../type-definition");
var util_1 = require("../../velocity/util");
var AUTH_DIRECTIVES = {
    aws_api_key: 'directive @aws_api_key on FIELD_DEFINITION | OBJECT',
    aws_iam: 'directive @aws_iam on FIELD_DEFINITION | OBJECT',
    aws_oidc: 'directive @aws_oidc on FIELD_DEFINITION | OBJECT',
    aws_lambda: 'directive @aws_lambda on FIELD_DEFINITION | OBJECT',
    aws_cognito_user_pools: 'directive @aws_cognito_user_pools(cognito_groups: [String!]) on FIELD_DEFINITION | OBJECT',
    aws_auth: 'directive @aws_auth(cognito_groups: [String!]!) on FIELD_DEFINITION',
};
var AUTH_TYPE_TO_DIRECTIVE_MAP = {
    aws_api_key: type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.API_KEY,
    aws_iam: type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.AWS_IAM,
    aws_auth: type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.AMAZON_COGNITO_USER_POOLS,
    aws_cognito_user_pools: type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.AMAZON_COGNITO_USER_POOLS,
    aws_oidc: type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.OPENID_CONNECT,
    aws_lambda: type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.AWS_LAMBDA,
};
var getAuthDirectiveTransformer = function (simulatorContext) {
    return function (schema) {
        var _a;
        return (0, utils_1.mapSchema)(schema, (_a = {},
            _a[utils_1.MapperKind.OBJECT_TYPE] = function (obj) {
                var fields = obj.getFields();
                Object.values(fields).forEach(function (field) {
                    var allowedAuthTypes = getFieldAuthType(field, obj, simulatorContext);
                    var allowedCognitoGroups = getAllowedCognitoGroups(field, obj);
                    var resolve = field.resolve;
                    var newResolver = function (root, args, ctx, info) {
                        var currentAuthMode = ctx.requestAuthorizationMode;
                        if (!allowedAuthTypes.includes(currentAuthMode)) {
                            var err = new util_1.Unauthorized("Not Authorized to access ".concat(field.name, " on type ").concat(obj.name), info);
                            throw err;
                        }
                        if (ctx.requestAuthorizationMode === type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.AMAZON_COGNITO_USER_POOLS &&
                            allowedCognitoGroups.length) {
                            var groups = getCognitoGroups(ctx.jwt || {});
                            var authorized = groups.some(function (group) { return allowedCognitoGroups.includes(group); });
                            if (!authorized) {
                                var err = new util_1.Unauthorized("Not Authorized to access ".concat(field.name, " on type ").concat(obj.name), info);
                                throw err;
                            }
                        }
                        return (resolve || graphql_1.defaultFieldResolver)(root, args, ctx, info);
                    };
                    field.resolve = newResolver;
                });
                return obj;
            },
            _a));
    };
};
exports.getAuthDirectiveTransformer = getAuthDirectiveTransformer;
var getAuthDirectives = function () {
    return Object.values(AUTH_DIRECTIVES).join('\n');
};
exports.getAuthDirectives = getAuthDirectives;
function getFieldAuthType(fieldConfig, object, simulator) {
    var fieldAuthDirectives = getAuthDirective(fieldConfig.astNode.directives);
    if (fieldAuthDirectives.length) {
        return fieldAuthDirectives;
    }
    var typeAuthDirectives = getAuthDirective(object.astNode.directives);
    if (typeAuthDirectives.length) {
        return typeAuthDirectives;
    }
    return [simulator.appSyncConfig.defaultAuthenticationType.authenticationType];
}
function getAllowedCognitoGroups(field, parentField) {
    var cognito_auth_directives = ['aws_auth', 'aws_cognito_user_pools'];
    var fieldDirectives = field.astNode.directives;
    var fieldAuthDirectives = getAuthDirective(fieldDirectives);
    if (fieldAuthDirectives.length) {
        return fieldDirectives
            .filter(function (d) { return cognito_auth_directives.includes(d.name.value); })
            .reduce(function (acc, d) { return __spreadArray(__spreadArray([], acc, true), getDirectiveArgumentValues(d, 'cognito_groups'), true); }, []);
    }
    var parentAuthDirectives = getAuthDirective(parentField.astNode.directives);
    if (parentAuthDirectives.length) {
        return parentField.astNode.directives
            .filter(function (d) { return function (d) { return cognito_auth_directives.includes(d.name.value); }; })
            .reduce(function (acc, d) { return __spreadArray(__spreadArray([], acc, true), getDirectiveArgumentValues(d, 'cognito_groups'), true); }, []);
    }
    return [];
}
function getAuthDirective(directives) {
    var authDirectiveNames = Object.keys(AUTH_DIRECTIVES);
    return Array.from(new Set(directives
        .map(function (d) { return d.name.value; })
        .filter(function (d) { return authDirectiveNames.includes(d); })
        .map(function (d) { return AUTH_TYPE_TO_DIRECTIVE_MAP[d]; })).values());
}
function getDirectiveArgumentValues(directives, argName) {
    return directives.arguments
        .filter(function (arg) { return arg.name.value === argName; })
        .reduce(function (acc, arg) { return __spreadArray(__spreadArray([], acc, true), (0, graphql_1.valueFromASTUntyped)(arg.value), true); }, []);
}
function getCognitoGroups(token) {
    if (token === void 0) { token = {}; }
    return token['cognito:groups'] ? token['cognito:groups'] : [];
}
//# sourceMappingURL=auth.js.map