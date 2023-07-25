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
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapSchema = exports.scalars = void 0;
var url_1 = require("url");
var graphql_1 = require("graphql");
var libphonenumber_js_1 = require("libphonenumber-js");
var net = __importStar(require("net"));
var graphql_iso_date_1 = require("graphql-iso-date");
var EMAIL_ADDRESS_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// Some of the custom scalars in this file are inspired by the graphql-scalars npm module.
var phoneValidator = function (ast, options) {
    var _a = options.country, country = _a === void 0 ? 'US' : _a;
    var kind = ast.kind, value = ast.value;
    if (kind !== graphql_1.Kind.STRING) {
        throw new graphql_1.GraphQLError("Query error: Can only parse strings got a: ".concat(kind), [ast]);
    }
    var isValid = (0, libphonenumber_js_1.isValidNumber)(value, country);
    if (!isValid) {
        throw new graphql_1.GraphQLError('Query error: Not a valid phone number', [ast]);
    }
    return value;
};
var AWSPhone = /** @class */ (function (_super) {
    __extends(AWSPhone, _super);
    function AWSPhone(options) {
        if (options === void 0) { options = { name: null, description: null }; }
        var name = options.name, description = options.description;
        return _super.call(this, {
            name: name,
            description: description,
            serialize: function (value) {
                var ast = {
                    kind: graphql_1.Kind.STRING,
                    value: value,
                };
                return phoneValidator(ast, options);
            },
            parseValue: function (value) {
                var ast = {
                    kind: graphql_1.Kind.STRING,
                    value: value,
                };
                return phoneValidator(ast, options);
            },
            parseLiteral: function (ast) { return phoneValidator(ast, options); },
        }) || this;
    }
    return AWSPhone;
}(graphql_1.GraphQLScalarType));
var AWSDate = new graphql_1.GraphQLScalarType({
    name: 'AWSDate',
    description: graphql_iso_date_1.GraphQLDate.description,
    serialize: function (value) {
        return graphql_iso_date_1.GraphQLDate.serialize(value);
    },
    parseValue: function (value) {
        return graphql_iso_date_1.GraphQLDate.parseValue(value) ? value : undefined;
    },
    parseLiteral: function (value) {
        return graphql_iso_date_1.GraphQLDate.parseLiteral(value) ? value.value : undefined;
    },
});
var AWSTime = new graphql_1.GraphQLScalarType({
    name: 'AWSTime',
    description: graphql_iso_date_1.GraphQLTime.description,
    serialize: function (value) {
        return graphql_iso_date_1.GraphQLTime.serialize(value);
    },
    parseValue: function (value) {
        return graphql_iso_date_1.GraphQLTime.parseValue(value) ? value : undefined;
    },
    parseLiteral: function (value) {
        return graphql_iso_date_1.GraphQLTime.parseLiteral(value) ? value.value : undefined;
    },
});
var AWSDateTime = new graphql_1.GraphQLScalarType({
    name: 'AWSDateTime',
    description: graphql_iso_date_1.GraphQLDateTime.description,
    serialize: function (value) {
        return graphql_iso_date_1.GraphQLDateTime.serialize(value);
    },
    parseValue: function (value) {
        return graphql_iso_date_1.GraphQLDateTime.parseValue(value) ? value : undefined;
    },
    parseLiteral: function (value) {
        return graphql_iso_date_1.GraphQLDateTime.parseLiteral(value) ? value.value : undefined;
    },
});
var AWSTimestamp = new graphql_1.GraphQLScalarType({
    name: 'AWSTimestamp',
    description: 'The AWSTimestamp scalar type represents the number of seconds that have elapsed \
since 1970-01-01T00:00Z. Timestamps are serialized and deserialized as numbers. Negative values \
are also accepted and these represent the number of seconds till 1970-01-01T00:00Z.',
    serialize: function (value) {
        return graphql_1.GraphQLInt.serialize(value);
    },
    parseValue: function (value) {
        return graphql_1.GraphQLInt.parseValue(value) ? value : undefined;
    },
    parseLiteral: function (value) {
        if (value.kind !== graphql_1.Kind.INT) {
            throw new graphql_1.GraphQLError("Can only validate integers but received: ".concat(value.kind));
        }
        return Number.parseInt(value.value, 10);
    },
});
// Unified the code for both types from graphql-scalars library.
var validateIPAddress = function (value) {
    if (typeof value !== 'string') {
        throw new TypeError("Value is not string: ".concat(value));
    }
    if (net.isIPv4(value) || net.isIPv6(value)) {
        return value;
    }
    throw new TypeError("Value is not a valid IP address: ".concat(value));
};
var AWSIPAddress = new graphql_1.GraphQLScalarType({
    name: 'AWSIPAddress',
    description: 'The AWSIPAddress scalar type represents a valid IPv4 or IPv6 address string.',
    serialize: function (value) {
        return validateIPAddress(value);
    },
    parseValue: function (value) {
        return validateIPAddress(value);
    },
    parseLiteral: function (ast) {
        if (ast.kind !== graphql_1.Kind.STRING) {
            throw new graphql_1.GraphQLError("Can only validate strings as IPv4 or IPv6 addresses but got a: ".concat(ast.kind));
        }
        return validateIPAddress(ast.value);
    },
});
var parseJson = function (value) {
    if (typeof value !== 'string') {
        throw new graphql_1.GraphQLError("Unable to parse ".concat(value, " as valid JSON."));
    }
    try {
        return JSON.parse(value);
    }
    catch (error) {
        throw new TypeError("Unable to parse ".concat(value, " as valid JSON."));
    }
};
var AWSJSON = new graphql_1.GraphQLScalarType({
    name: 'AWSJSON',
    description: 'The AWSJSON scalar type represents a valid json object serialized as a string.',
    serialize: function (value) {
        return JSON.stringify(value);
    },
    parseValue: function (value) {
        return parseJson(value);
    },
    parseLiteral: function (ast) {
        if (ast.kind !== graphql_1.Kind.STRING) {
            throw new graphql_1.GraphQLError("Unable to parse ".concat(ast.kind, " as valid JSON."));
        }
        return parseJson(ast.value);
    },
});
var validateEmail = function (value) {
    if (typeof value !== 'string') {
        throw new TypeError("Value is not string: ".concat(value));
    }
    if (!EMAIL_ADDRESS_REGEX.test(value)) {
        throw new TypeError("Value is not a valid email address: ".concat(value));
    }
    return value;
};
var AWSEmail = new graphql_1.GraphQLScalarType({
    name: 'AWSEmail',
    description: 'A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/.',
    serialize: validateEmail,
    parseValue: validateEmail,
    parseLiteral: function (ast) {
        if (ast.kind !== graphql_1.Kind.STRING) {
            throw new graphql_1.GraphQLError("Can only validate strings as email addresses but got a: ".concat(ast.kind));
        }
        return validateEmail(ast.value);
    },
});
var parseUrlValue = function (value) { return (value ? new url_1.URL(value.toString()) : value); };
var AWSURL = new graphql_1.GraphQLScalarType({
    name: 'AWSURL',
    description: 'A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.',
    serialize: function (value) {
        if (value) {
            return new url_1.URL(value.toString()).toString();
        }
        return value;
    },
    parseValue: parseUrlValue,
    parseLiteral: function (ast) {
        if (ast.kind !== graphql_1.Kind.STRING) {
            throw new graphql_1.GraphQLError("Can only validate strings as URLs but got a: ".concat(ast.kind));
        }
        return parseUrlValue(ast.value);
    },
});
exports.scalars = {
    AWSJSON: AWSJSON,
    AWSDate: AWSDate,
    AWSTime: AWSTime,
    AWSDateTime: AWSDateTime,
    AWSPhone: new AWSPhone({ name: 'AWSPhone', description: 'AWSPhone' }),
    AWSEmail: AWSEmail,
    AWSURL: AWSURL,
    AWSTimestamp: AWSTimestamp,
    AWSIPAddress: AWSIPAddress,
};
function wrapSchema(schemaString) {
    var scalarStrings = Object.keys(exports.scalars)
        .map(function (scalarKey) { return "scalar ".concat(scalarKey, "\n"); })
        .join('');
    return scalarStrings + schemaString;
}
exports.wrapSchema = wrapSchema;
//# sourceMappingURL=index.js.map