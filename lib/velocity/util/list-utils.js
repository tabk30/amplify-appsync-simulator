"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUtils = void 0;
var lodash_1 = require("lodash");
var array_1 = require("../value-mapper/array");
var mapper_1 = require("../value-mapper/mapper");
exports.listUtils = {
    copyAndRetainAll: function (list, intersect) {
        if (list instanceof array_1.JavaArray && intersect instanceof array_1.JavaArray) {
            return (0, mapper_1.map)(list.toJSON().filter(function (value) { return intersect.toJSON().includes(value); }));
        }
        else {
            return list.filter(function (value) { return intersect.indexOf(value) !== -1; });
        }
    },
    copyAndRemoveAll: function (list, toRemove) {
        if (list instanceof array_1.JavaArray && toRemove instanceof array_1.JavaArray) {
            // we convert back to js array to filter and then re-create as java array when filtering is done
            // this is avoid using filtering within the java array is that can create a '0' entry
            return (0, mapper_1.map)(list.toJSON().filter(function (value) { return !toRemove.toJSON().includes(value); }));
        }
        else {
            return list.filter(function (value) { return toRemove.indexOf(value) === -1; });
        }
    },
    sortList: function (list, desc, property) {
        if (list.length === 0 || list.length > 1000) {
            return list;
        }
        var type = typeof list[0];
        var isMixedTypes = (0, lodash_1.some)(list.slice(1), function (i) { return typeof i !== type; });
        if (isMixedTypes) {
            return list;
        }
        var isScalarList = (0, lodash_1.some)(list, (0, lodash_1.negate)(lodash_1.isObject));
        return (0, lodash_1.orderBy)(list, isScalarList ? lodash_1.identity : property, desc ? 'desc' : 'asc');
    },
};
//# sourceMappingURL=list-utils.js.map