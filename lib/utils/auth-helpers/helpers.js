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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllowedAuthTypes = exports.extractHeader = exports.isValidOIDCToken = exports.extractIamToken = exports.extractJwtToken = void 0;
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var type_definition_1 = require("../../type-definition");
function extractJwtToken(authorization) {
    try {
        return (0, jwt_decode_1.default)(authorization);
    }
    catch (_) {
        return undefined;
    }
}
exports.extractJwtToken = extractJwtToken;
function extractIamToken(authorization, appSyncConfig) {
    var _a;
    var accessKeyId = authorization.includes('Credential=') ? (_a = authorization.split('Credential=')[1]) === null || _a === void 0 ? void 0 : _a.split('/')[0] : undefined;
    if (!accessKeyId) {
        throw new Error('missing accessKeyId');
    }
    if (accessKeyId === appSyncConfig.authAccessKeyId) {
        return {
            accountId: appSyncConfig.accountId,
            userArn: "arn:aws:sts::".concat(appSyncConfig.accountId, ":").concat(appSyncConfig.authRoleName),
            username: 'auth-user',
        };
    }
    else {
        return {
            accountId: appSyncConfig.accountId,
            userArn: "arn:aws:sts::".concat(appSyncConfig.accountId, ":").concat(appSyncConfig.unAuthRoleName),
            username: 'unauth-user',
        };
    }
}
exports.extractIamToken = extractIamToken;
function isValidOIDCToken(token, configuredAuthTypes) {
    var oidcIssuers = configuredAuthTypes
        .filter(function (authType) { return authType.authenticationType === type_definition_1.AmplifyAppSyncSimulatorAuthenticationType.OPENID_CONNECT; })
        .map(function (auth) {
        return auth.openIDConnectConfig.Issuer && auth.openIDConnectConfig.Issuer.endsWith('/')
            ? auth.openIDConnectConfig.Issuer.substring(0, auth.openIDConnectConfig.Issuer.length - 1)
            : auth.openIDConnectConfig.Issuer;
    });
    var tokenIssuer = token.iss.endsWith('/') ? token.iss.substring(0, token.iss.length - 1) : token.iss;
    return oidcIssuers.length > 0 && oidcIssuers.includes(tokenIssuer);
}
exports.isValidOIDCToken = isValidOIDCToken;
function extractHeader(headers, name) {
    var headerName = Object.keys(headers).find(function (header) { return header.toLowerCase() === name.toLowerCase(); });
    var headerValue = headerName && headers[headerName];
    return headerValue ? (Array.isArray(headerValue) ? headerValue[0] : headerValue) : undefined;
}
exports.extractHeader = extractHeader;
function getAllowedAuthTypes(config) {
    return __spreadArray([config.defaultAuthenticationType], config.additionalAuthenticationProviders, true).map(function (authType) { return authType.authenticationType; });
}
exports.getAllowedAuthTypes = getAllowedAuthTypes;
//# sourceMappingURL=helpers.js.map