"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationServer = void 0;
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var graphql_1 = require("graphql");
var path_1 = require("path");
var auth_helpers_1 = require("../utils/auth-helpers");
var helpers_1 = require("../utils/graphql-runner/helpers");
var query_and_mutation_1 = require("../utils/graphql-runner/query-and-mutation");
var subscriptions_1 = require("../utils/graphql-runner/subscriptions");
var helpers_2 = require("../utils/auth-helpers/helpers");
var server_1 = require("./subscription/websocket-server/server");
// eslint-disable-next-line spellcheck/spell-checker
var MAX_BODY_SIZE = '10mb';
var STATIC_ROOT = (0, path_1.join)(__dirname, '..', '..', 'public');
var OperationServer = /** @class */ (function () {
    function OperationServer(config, simulatorContext) {
        var _this = this;
        this.config = config;
        this.simulatorContext = simulatorContext;
        this.handleClearDBData = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var deletedItems, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Clearing DB data...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.simulatorContext.clearData()];
                    case 2:
                        deletedItems = _a.sent();
                        console.log('DB data cleared');
                        return [2 /*return*/, response.status(200).send({ message: "Successfully deleted ".concat(JSON.stringify(deletedItems), " tables") })];
                    case 3:
                        e_1 = _a.sent();
                        console.error("Error clearing DB data. Error: ".concat(e_1.message));
                        return [2 /*return*/, response.status(500).send({ message: e_1.message })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleAPIInfoRequest = function (request, response) {
            return response.send(_this.simulatorContext.appSyncConfig);
        };
        this.handleRequest = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var headers, requestAuthorizationMode, _a, _b, variables, query, operationName, doc, authorization, jwt, sourceIp, iamToken, context, _c, gqlResult, subscriptionResult, e_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 7, , 8]);
                        headers = request.headers;
                        requestAuthorizationMode = void 0;
                        try {
                            requestAuthorizationMode = (0, auth_helpers_1.getAuthorizationMode)(headers, this.simulatorContext.appSyncConfig);
                        }
                        catch (e) {
                            return [2 /*return*/, response.status(401).send({
                                    errors: [
                                        {
                                            errorType: 'UnauthorizedException',
                                            message: e.message,
                                        },
                                    ],
                                })];
                        }
                        _a = request.body, _b = _a.variables, variables = _b === void 0 ? {} : _b, query = _a.query, operationName = _a.operationName;
                        doc = (0, graphql_1.parse)(query);
                        if (!this.simulatorContext.schema) {
                            return [2 /*return*/, response.send({
                                    data: null,
                                    error: 'No schema available',
                                })];
                        }
                        authorization = (0, auth_helpers_1.extractHeader)(headers, 'Authorization');
                        jwt = authorization && (0, auth_helpers_1.extractJwtToken)(authorization);
                        sourceIp = request.connection.remoteAddress;
                        iamToken = requestAuthorizationMode === 'AWS_IAM' ? (0, helpers_2.extractIamToken)(authorization, this.simulatorContext.appSyncConfig) : undefined;
                        context = {
                            jwt: jwt,
                            requestAuthorizationMode: requestAuthorizationMode,
                            sourceIp: sourceIp,
                            headers: request.headers,
                            appsyncErrors: [],
                            iamToken: iamToken,
                        };
                        _c = (0, helpers_1.getOperationType)(doc, operationName);
                        switch (_c) {
                            case 'query': return [3 /*break*/, 1];
                            case 'mutation': return [3 /*break*/, 1];
                            case 'subscription': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, (0, query_and_mutation_1.runQueryOrMutation)(this.simulatorContext.schema, doc, variables, operationName, context)];
                    case 2:
                        gqlResult = _d.sent();
                        return [2 /*return*/, response.send(gqlResult)];
                    case 3: return [4 /*yield*/, (0, subscriptions_1.runSubscription)(this.simulatorContext.schema, doc, variables, operationName, context)];
                    case 4:
                        subscriptionResult = _d.sent();
                        if (subscriptionResult.errors) {
                            return [2 /*return*/, response.send(subscriptionResult)];
                        }
                        throw new Error("Subscription request is only supported in realtime url. Send requests to ".concat(server_1.REALTIME_SUBSCRIPTION_PATH, " path instead"));
                    case 5: throw new Error("unknown operation");
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_2 = _d.sent();
                        console.log('Error while executing GraphQL statement', e_2);
                        return [2 /*return*/, response.send({
                                errorMessage: e_2.message,
                            })];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this._app = (0, express_1.default)();
        this._app.use(express_1.default.json({ limit: MAX_BODY_SIZE }));
        this._app.use((0, cors_1.default)());
        /* eslint-disable @typescript-eslint/no-misused-promises */
        this._app.post('/graphql', this.handleRequest);
        /* eslint-enable */
        this._app.get('/api-config', this.handleAPIInfoRequest);
        /* eslint-disable @typescript-eslint/no-misused-promises */
        this._app.delete('/clear-data', this.handleClearDBData);
        /* eslint-enable */
        this._app.use('/', express_1.default.static(STATIC_ROOT));
    }
    Object.defineProperty(OperationServer.prototype, "app", {
        get: function () {
            return this._app;
        },
        enumerable: false,
        configurable: true
    });
    return OperationServer;
}());
exports.OperationServer = OperationServer;
//# sourceMappingURL=operations.js.map