"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketSubscriptionServer = exports.REALTIME_SUBSCRIPTION_PATH = void 0;
var graphql_1 = require("graphql");
var WebSocket = __importStar(require("ws"));
var ws_1 = require("ws");
var message_type_guards_1 = require("./message-type-guards");
var message_types_1 = require("./message-types");
var utils_1 = require("./utils");
exports.REALTIME_SUBSCRIPTION_PATH = '/graphql/realtime';
var PROTOCOL = 'graphql-ws';
var KEEP_ALIVE_TIMEOUT = 4 * 60 * 1000; // Wait time between Keep Alive Message
// Max time the client will wait for Keep Alive message before disconnecting. Sent to the client as part of connection ack
var CONNECTION_TIMEOUT_DURATION = 5 * 60 * 1000;
var DEFAULT_OPTIONS = {
    onConnectHandler: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); },
    keepAlive: KEEP_ALIVE_TIMEOUT,
    connectionTimeoutDuration: CONNECTION_TIMEOUT_DURATION,
};
var WebsocketSubscriptionServer = /** @class */ (function () {
    function WebsocketSubscriptionServer(options, server) {
        var _this = this;
        this.onClose = function (connectionContext) { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, subscription;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = Array.from(connectionContext.subscriptions.values());
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        subscription = _a[_i];
                        return [4 /*yield*/, this.stopAsyncIterator(connectionContext, subscription.id)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (connectionContext.pingIntervalHandle) {
                            clearInterval(connectionContext.pingIntervalHandle);
                            connectionContext.pingIntervalHandle = null;
                        }
                        this.connections.delete(connectionContext);
                        return [2 /*return*/];
                }
            });
        }); };
        this.onUnsubscribe = function (connectionContext, messageOrSubscriptionId) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = messageOrSubscriptionId.id;
                        return [4 /*yield*/, this.stopAsyncIterator(connectionContext, id)];
                    case 1:
                        _a.sent();
                        this.sendMessage(connectionContext, id, message_types_1.MESSAGE_TYPES.GQL_COMPLETE, {});
                        return [2 /*return*/];
                }
            });
        }); };
        this.stopAsyncIterator = function (connectionContext, id) { return __awaiter(_this, void 0, void 0, function () {
            var subscription;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(connectionContext.subscriptions && connectionContext.subscriptions.has(id))) return [3 /*break*/, 3];
                        subscription = connectionContext.subscriptions.get(id);
                        if (!subscription.asyncIterator) return [3 /*break*/, 2];
                        return [4 /*yield*/, subscription.asyncIterator.return()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        connectionContext.subscriptions.delete(id);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.onSocketConnection = function (socket, request) { return __awaiter(_this, void 0, void 0, function () {
            var connectionContext_1, headers, onMessage_1, onClose_1, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        socket.upgradeReq = request;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (typeof socket.protocol === 'undefined' || socket.protocol !== PROTOCOL) {
                            throw new Error('Invalid protocol');
                        }
                        connectionContext_1 = {
                            request: request,
                            socket: socket,
                            subscriptions: new Map(),
                            isConnectionInitialized: false,
                        };
                        headers = (0, utils_1.decodeHeaderFromQueryParam)(request.url);
                        return [4 /*yield*/, this.options.onConnectHandler(connectionContext_1, headers)];
                    case 2:
                        _a.sent();
                        this.connections.add(connectionContext_1);
                        onMessage_1 = function (message) {
                            void _this.onMessage(connectionContext_1, message);
                        };
                        onClose_1 = function (error) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        socket.off('message', onMessage_1);
                                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                        socket.off('close', onClose_1);
                                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                        socket.off('error', onClose_1);
                                        return [4 /*yield*/, this.onSocketDisconnection(connectionContext_1, error)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        socket.on('message', onMessage_1);
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        socket.on('close', onClose_1);
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        socket.on('error', onClose_1);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        socket.close(1002); // protocol error
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.onSocketDisconnection = function (connectionContext, error) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.onClose(connectionContext)];
                    case 1:
                        _a.sent();
                        if (error) {
                            this.sendError(connectionContext, '', { message: error instanceof Error ? error.message : error });
                            setTimeout(function () {
                                // 1011 is an unexpected condition prevented the request from being fulfilled
                                connectionContext.socket.close(1011);
                            }, 10);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.onMessage = function (connectionContext, rawMessage) {
            var message = JSON.parse(rawMessage);
            try {
                switch (message.type) {
                    case message_types_1.MESSAGE_TYPES.GQL_CONNECTION_INIT:
                        if ((0, message_type_guards_1.isSubscriptionConnectionInitMessage)(message)) {
                            return _this.onConnectionInit(connectionContext);
                        }
                        break;
                    case message_types_1.MESSAGE_TYPES.GQL_START:
                        if ((0, message_type_guards_1.isSubscriptionStartMessage)(message)) {
                            return _this.onSubscriptionStart(connectionContext, message);
                        }
                        break;
                    case message_types_1.MESSAGE_TYPES.GQL_STOP:
                        if ((0, message_type_guards_1.isSubscriptionStopMessage)(message)) {
                            return _this.onUnsubscribe(connectionContext, message);
                        }
                }
                throw new Error('Invalid message');
            }
            catch (e) {
                _this.sendError(connectionContext, '', { errors: [{ message: e.message }] });
            }
            return undefined;
        };
        this.sendMessage = function (connectionContext, subscriptionId, type, data) {
            var message = {
                type: type,
                id: subscriptionId,
                payload: data,
            };
            if (connectionContext.socket.readyState === WebSocket.OPEN) {
                connectionContext.socket.send(JSON.stringify(message));
            }
        };
        this.sendError = function (connectionContext, subscriptionId, errorPayload, type) {
            if (type === void 0) { type = message_types_1.MESSAGE_TYPES.GQL_ERROR; }
            if ([message_types_1.MESSAGE_TYPES.GQL_CONNECTION_ERROR, message_types_1.MESSAGE_TYPES.GQL_ERROR].indexOf(type) === -1) {
                throw new Error("Message type should for error should be one of ".concat(message_types_1.MESSAGE_TYPES.GQL_ERROR, " or ").concat(message_types_1.MESSAGE_TYPES.GQL_CONNECTION_ERROR));
            }
            _this.sendMessage(connectionContext, subscriptionId, type, errorPayload);
        };
        this.setupPing = function (connectionContext) {
            connectionContext.pingIntervalHandle = setInterval(function () {
                _this.sendMessage(connectionContext, undefined, message_types_1.MESSAGE_TYPES.GQL_CONNECTION_KEEP_ALIVE, undefined);
            }, _this.options.keepAlive);
        };
        this.onConnectionInit = function (connectionContext) {
            connectionContext.isConnectionInitialized = true;
            var response = {
                type: message_types_1.MESSAGE_TYPES.GQL_CONNECTION_ACK,
                payload: {
                    connectionTimeout: _this.options.connectionTimeoutDuration,
                },
            };
            _this.sendMessage(connectionContext, undefined, response.type, response.payload);
            _this.setupPing(connectionContext);
            // Regular keep alive messages if keepAlive is set
            _this.setupPing(connectionContext);
        };
        this.onSubscriptionStart = function (connectionContext, message) { return __awaiter(_this, void 0, void 0, function () {
            var id, data, query, variables, headers, asyncIterator, error, subscription;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = message.id;
                        data = JSON.parse(message.payload.data);
                        query = (0, graphql_1.parse)(data.query);
                        variables = data.variables;
                        headers = message.payload.extensions.authorization;
                        if (!(connectionContext.subscriptions && connectionContext.subscriptions.has(id))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.stopAsyncIterator(connectionContext, id)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.options.onSubscribeHandler(query, variables, headers, connectionContext.request)];
                    case 3:
                        asyncIterator = _a.sent();
                        if (!asyncIterator.errors) return [3 /*break*/, 4];
                        error = {
                            errors: asyncIterator.errors,
                            data: asyncIterator.data || null,
                        };
                        this.sendError(connectionContext, id, error, message_types_1.MESSAGE_TYPES.GQL_ERROR);
                        return [3 /*break*/, 6];
                    case 4:
                        subscription = {
                            id: id,
                            asyncIterator: asyncIterator,
                            document: query,
                            variables: variables,
                        };
                        connectionContext.subscriptions.set(id, subscription);
                        this.sendMessage(connectionContext, id, message_types_1.MESSAGE_TYPES.GQL_START_ACK, {});
                        return [4 /*yield*/, this.attachAsyncIterator(connectionContext, subscription)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.attachAsyncIterator = function (connectionContext, sub) { return __awaiter(_this, void 0, void 0, function () {
            var asyncIterator, id, done, _a, value, doneResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        asyncIterator = sub.asyncIterator, id = sub.id;
                        done = false;
                        _b.label = 1;
                    case 1: return [4 /*yield*/, asyncIterator.next()];
                    case 2:
                        _a = _b.sent(), value = _a.value, doneResult = _a.done;
                        done = doneResult;
                        if (done) {
                            return [3 /*break*/, 4];
                        }
                        this.sendMessage(connectionContext, id, message_types_1.MESSAGE_TYPES.GQL_DATA, value);
                        _b.label = 3;
                    case 3:
                        if (!done) return [3 /*break*/, 1];
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.connections = new Set();
        this.options = __assign(__assign({}, DEFAULT_OPTIONS), options);
        if (server) {
            this.attachWebServer(server);
        }
    }
    WebsocketSubscriptionServer.prototype.attachWebServer = function (serverOptions) {
        this.webSocketServer = new ws_1.Server(__assign(__assign({}, serverOptions), { path: exports.REALTIME_SUBSCRIPTION_PATH }));
    };
    WebsocketSubscriptionServer.prototype.start = function () {
        if (!this.webSocketServer) {
            throw new Error('No server is attached');
        }
        /* eslint-disable @typescript-eslint/no-misused-promises */
        this.webSocketServer.on('connection', this.onSocketConnection);
    };
    WebsocketSubscriptionServer.prototype.stop = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _i, _c, connection;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        (_a = this.webSocketServer) === null || _a === void 0 ? void 0 : _a.off('connection', this.onSocketConnection);
                        _i = 0, _c = Array.from(this.connections);
                        _d.label = 1;
                    case 1:
                        if (!(_i < _c.length)) return [3 /*break*/, 4];
                        connection = _c[_i];
                        return [4 /*yield*/, this.onClose(connection)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        (_b = this.webSocketServer) === null || _b === void 0 ? void 0 : _b.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    return WebsocketSubscriptionServer;
}());
exports.WebsocketSubscriptionServer = WebsocketSubscriptionServer;
//# sourceMappingURL=server.js.map