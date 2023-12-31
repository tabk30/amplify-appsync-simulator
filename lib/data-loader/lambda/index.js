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
exports.LambdaDataLoader = void 0;
var dataloader_1 = __importDefault(require("dataloader"));
var batchLoaders = {};
var getBatchDataResolver = function (loaderName, resolver) {
    if (batchLoaders[loaderName] === undefined) {
        batchLoaders[loaderName] = new dataloader_1.default(resolver, { cache: false });
    }
    return batchLoaders[loaderName];
};
var LambdaDataLoader = /** @class */ (function () {
    function LambdaDataLoader(_config) {
        this._config = _config;
    }
    LambdaDataLoader.prototype.load = function (req, extraData) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, fieldName, parentType, batchName, dataLoader, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        result = void 0;
                        if (!(req.operation === 'BatchInvoke')) return [3 /*break*/, 2];
                        _a = extraData.info, fieldName = _a.fieldName, parentType = _a.parentType;
                        batchName = "".concat(parentType, ".").concat(fieldName);
                        dataLoader = getBatchDataResolver(batchName, this._config.invoke);
                        return [4 /*yield*/, dataLoader.load(req.payload)];
                    case 1:
                        result = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this._config.invoke(req.payload)];
                    case 3:
                        result = _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, result];
                    case 5:
                        e_1 = _b.sent();
                        console.log('Lambda Data source failed with the following error');
                        console.error(e_1);
                        throw e_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return LambdaDataLoader;
}());
exports.LambdaDataLoader = LambdaDataLoader;
//# sourceMappingURL=index.js.map