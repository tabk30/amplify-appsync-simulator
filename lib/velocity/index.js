"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.VelocityTemplate = exports.VelocityTemplateParseError = void 0;
var type_definition_1 = require("../type-definition");
var amplify_velocity_template_1 = require("amplify-velocity-template");
var util_1 = require("./util");
var mapper_1 = require("./value-mapper/mapper");
var info_1 = require("./util/info");
var VelocityTemplateParseError = /** @class */ (function (_super) {
    __extends(VelocityTemplateParseError, _super);
    function VelocityTemplateParseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VelocityTemplateParseError;
}(Error));
exports.VelocityTemplateParseError = VelocityTemplateParseError;
var VelocityTemplate = /** @class */ (function () {
    function VelocityTemplate(template, simulatorContext) {
        var _a;
        this.simulatorContext = simulatorContext;
        try {
            var ast = (0, amplify_velocity_template_1.parse)(template.content.toString());
            this.compiler = new amplify_velocity_template_1.Compile(ast, {
                valueMapper: mapper_1.map,
                escape: false,
            });
            this.template = template;
        }
        catch (e) {
            var lineDetails = "".concat(e.hash.line, ":").concat(((_a = e.hash.loc) === null || _a === void 0 ? void 0 : _a.first_column) ? e.hash.loc.first_column : '');
            var fileName = template.path ? "".concat(template.path, ":").concat(lineDetails) : lineDetails;
            var templateError = new VelocityTemplateParseError("Error:Parse error on ".concat(fileName, " \n").concat(e.message));
            templateError.stack = e.stack;
            throw templateError;
        }
    }
    VelocityTemplate.prototype.render = function (ctxValues, requestContext, info) {
        var context = this.buildRenderContext(ctxValues, requestContext, info);
        var templateResult;
        try {
            templateResult = this.compiler.render(context);
        }
        catch (e) {
            var lastError = context.util.errors.length && context.util.errors[context.util.errors.length - 1];
            if (lastError && lastError instanceof util_1.ValidateError) {
                return {
                    result: lastError.data,
                    errors: __spreadArray([], context.util.errors, true),
                    isReturn: true,
                    stash: context.ctx.stash.toJSON(),
                    args: context.ctx.args.toJSON(),
                    hadException: true,
                };
            }
            return {
                result: null,
                errors: __spreadArray([], context.util.errors, true),
                isReturn: false,
                stash: context.ctx.stash.toJSON(),
                args: context.ctx.args.toJSON(),
                hadException: true,
            };
        }
        var isReturn = this.compiler._state.return; // If the template has #return, then set the value
        var stash = context.ctx.stash.toJSON();
        var args = context.ctx.args.toJSON();
        try {
            var result = JSON.parse(templateResult);
            return { result: result, stash: stash, args: args, errors: context.util.errors, isReturn: isReturn, hadException: false };
        }
        catch (e) {
            if (isReturn) {
                // # when template has #return, if the value is non JSON, we pass that along
                return { result: templateResult, stash: stash, args: args, errors: context.util.errors, isReturn: isReturn, hadException: false };
            }
            var errorMessage = "Unable to convert ".concat(templateResult, " to class com.amazonaws.deepdish.transform.model.lambda.LambdaVersionedConfig.");
            throw new util_1.TemplateSentError(errorMessage, 'MappingTemplate', null, null, info);
        }
    };
    VelocityTemplate.prototype.buildRenderContext = function (ctxValues, requestContext, info) {
        var _a;
        var source = ctxValues.source, argument = ctxValues.arguments, result = ctxValues.result, stash = ctxValues.stash, prevResult = ctxValues.prevResult, error = ctxValues.error;
        var jwt = requestContext.jwt, sourceIp = requestContext.sourceIp, iamToken = requestContext.iamToken;
        var _b = jwt || {}, issuer = _b.iss, sub = _b.sub, cognitoUserName = _b["cognito:username"], username = _b.username;
        var util = (0, util_1.create)([], new Date(Date.now()), info, requestContext);
        var args = (0, mapper_1.map)(argument);
        // Identity is null for API Key
        var identity = null;
        if (requestContext.requestAuthorizationMode === type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.OPENID_CONNECT) {
            identity = (0, mapper_1.map)({
                sub: sub,
                issuer: issuer,
                sourceIp: sourceIp,
                claims: requestContext.jwt,
            });
        }
        else if (requestContext.requestAuthorizationMode === type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.AMAZON_COGNITO_USER_POOLS) {
            identity = (0, mapper_1.map)(__assign({ sub: sub, issuer: issuer, sourceIp: sourceIp, 'cognito:username': cognitoUserName, username: username || cognitoUserName, claims: requestContext.jwt }, (this.simulatorContext.appSyncConfig.defaultAuthenticationType.authenticationType ===
                type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.AMAZON_COGNITO_USER_POOLS
                ? { defaultAuthStrategy: 'ALLOW' }
                : {})));
        }
        else if (requestContext.requestAuthorizationMode === type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.AWS_IAM) {
            identity = (0, mapper_1.map)({
                sourceIp: sourceIp,
                username: iamToken.username,
                userArn: iamToken.userArn,
                cognitoIdentityPoolId: iamToken === null || iamToken === void 0 ? void 0 : iamToken.cognitoIdentityPoolId,
                cognitoIdentityId: iamToken === null || iamToken === void 0 ? void 0 : iamToken.cognitoIdentityId,
                cognitoIdentityAuthType: iamToken === null || iamToken === void 0 ? void 0 : iamToken.cognitoIdentityAuthType,
                cognitoIdentityAuthProvider: iamToken === null || iamToken === void 0 ? void 0 : iamToken.cognitoIdentityAuthProvider,
            });
        }
        var vtlContext = {
            arguments: args,
            args: args,
            info: (0, mapper_1.map)((0, info_1.createInfo)(info)),
            request: { headers: requestContext.headers },
            identity: identity,
            stash: (0, mapper_1.map)(stash || {}),
            source: (0, mapper_1.map)(source),
            result: (0, mapper_1.map)(result),
            // surfacing the errorType to ensure the type is included in $ctx.error
            // Mapping Template Errors: https://docs.aws.amazon.com/appsync/latest/devguide/troubleshooting-and-common-mistakes.html#mapping-template-errors
            error: error
                ? __assign(__assign({}, error), { type: error.type || ((_a = error.extensions) === null || _a === void 0 ? void 0 : _a.errorType) || 'UnknownErrorType', message: error.message || "Error: ".concat(error) }) : error,
        };
        if (typeof prevResult !== 'undefined') {
            vtlContext['prev'] = (0, mapper_1.map)({
                result: prevResult,
            });
        }
        return {
            util: util,
            utils: util,
            context: vtlContext,
            ctx: vtlContext,
        };
    };
    return VelocityTemplate;
}());
exports.VelocityTemplate = VelocityTemplate;
//# sourceMappingURL=index.js.map