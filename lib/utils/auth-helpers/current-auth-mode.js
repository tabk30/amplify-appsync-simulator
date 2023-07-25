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
exports.getAuthorizationMode = void 0;
var type_definition_1 = require("../../type-definition");
var helpers_1 = require("./helpers");
function getAuthorizationMode(headers, appSyncConfig) {
    var apiKey = (0, helpers_1.extractHeader)(headers, 'x-api-key');
    var rawAuthHeader = (0, helpers_1.extractHeader)(headers, 'Authorization');
    var authorization = Array.isArray(rawAuthHeader) ? rawAuthHeader[0] : rawAuthHeader;
    var jwtToken = (0, helpers_1.extractJwtToken)(authorization);
    var allowedAuthTypes = (0, helpers_1.getAllowedAuthTypes)(appSyncConfig);
    var isApiKeyAllowed = allowedAuthTypes.includes(type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.API_KEY);
    var isIamAllowed = allowedAuthTypes.includes(type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.AWS_IAM);
    var isCupAllowed = allowedAuthTypes.includes(type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.AMAZON_COGNITO_USER_POOLS);
    var isOidcAllowed = allowedAuthTypes.includes(type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.OPENID_CONNECT);
    if (isApiKeyAllowed) {
        if (apiKey) {
            if (appSyncConfig.apiKey === apiKey) {
                return type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.API_KEY;
            }
            throw new Error('UnauthorizedException: Invalid API key');
        }
    }
    if (authorization) {
        if (isIamAllowed) {
            var isSignatureV4Token = authorization.startsWith('AWS4-HMAC-SHA256');
            if (isSignatureV4Token) {
                return type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.AWS_IAM;
            }
        }
        if (jwtToken) {
            if (isCupAllowed) {
                var isCupToken = jwtToken.iss.startsWith('https://cognito-idp.');
                if (isCupToken) {
                    return type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.AMAZON_COGNITO_USER_POOLS;
                }
            }
            if (isOidcAllowed) {
                var isOidcToken = (0, helpers_1.isValidOIDCToken)(jwtToken, __spreadArray([
                    appSyncConfig.defaultAuthenticationType
                ], appSyncConfig.additionalAuthenticationProviders, true));
                if (isOidcToken) {
                    return type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.OPENID_CONNECT;
                }
            }
        }
        throw new Error('UnauthorizedException: Invalid JWT token');
    }
    throw new Error('UnauthorizedException: Missing authorization');
}
exports.getAuthorizationMode = getAuthorizationMode;
//# sourceMappingURL=current-auth-mode.js.map