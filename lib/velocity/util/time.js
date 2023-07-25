"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.time = void 0;
var moment_1 = __importDefault(require("moment"));
require("moment-timezone");
require("moment-jdateformatparser");
var to_json_1 = require("../value-mapper/to-json");
var parseTimestamp = function (dateTime, format, timezone) {
    if (!dateTime || !format) {
        return null;
    }
    try {
        var momentFormatString = (0, moment_1.default)().toMomentFormatString(format);
        return timezone ? moment_1.default.tz(dateTime, momentFormatString, timezone) : (0, moment_1.default)(dateTime, momentFormatString);
    }
    catch (e) {
        return null;
    }
};
var time = function () { return ({
    nowISO8601: function () {
        return (0, moment_1.default)().toISOString();
    },
    nowEpochSeconds: function () {
        return (0, moment_1.default)().unix();
    },
    nowEpochMilliSeconds: function () {
        return (0, moment_1.default)().valueOf();
    },
    nowFormatted: function (format, timezone) {
        if (timezone === void 0) { timezone = null; }
        var jsonFormat = (0, to_json_1.toJSON)(format);
        var jsonTimezone = (0, to_json_1.toJSON)(timezone);
        try {
            if (jsonTimezone) {
                return (0, moment_1.default)().tz(jsonTimezone).formatWithJDF(jsonFormat);
            }
            return (0, moment_1.default)().formatWithJDF(jsonFormat);
        }
        catch (e) {
            return null;
        }
    },
    parseFormattedToEpochMilliSeconds: function (dateTime, format, timezone) {
        var jsonDateTime = (0, to_json_1.toJSON)(dateTime);
        var jsonFormat = (0, to_json_1.toJSON)(format);
        var jsonTimezone = (0, to_json_1.toJSON)(timezone);
        var timestamp = parseTimestamp(jsonDateTime, jsonFormat, jsonTimezone);
        return timestamp ? timestamp.valueOf() : null;
    },
    parseISO8601ToEpochMilliSeconds: function (dateTime) {
        var jsonDateTime = (0, to_json_1.toJSON)(dateTime);
        var timestamp = parseTimestamp(jsonDateTime, 'YYYY-MM-DDTHH:mm:ss.SZ');
        return timestamp ? timestamp.valueOf() : null;
    },
    epochMilliSecondsToSeconds: function (milliseconds) {
        var jsonMilliseconds = (0, to_json_1.toJSON)(milliseconds);
        try {
            return Math.floor(jsonMilliseconds / 1000);
        }
        catch (e) {
            return null;
        }
    },
    epochMilliSecondsToISO8601: function (dateTime) {
        var jsonDateTime = (0, to_json_1.toJSON)(dateTime);
        try {
            return (0, moment_1.default)(jsonDateTime).toISOString();
        }
        catch (e) {
            return null;
        }
    },
    epochMilliSecondsToFormatted: function (timestamp, format, timezone) {
        if (timezone === void 0) { timezone = 'UTC'; }
        var jsonTimestamp = (0, to_json_1.toJSON)(timestamp);
        var jsonFormat = (0, to_json_1.toJSON)(format);
        var jsonTimezone = (0, to_json_1.toJSON)(timezone);
        try {
            return (0, moment_1.default)(jsonTimestamp).tz(jsonTimezone).formatWithJDF(jsonFormat);
        }
        catch (e) {
            return null;
        }
    },
}); };
exports.time = time;
//# sourceMappingURL=time.js.map