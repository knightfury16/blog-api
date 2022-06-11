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
exports.__esModule = true;
var apiToReadme_1 = require("./apiToReadme");
var path = require("path");
var userRoute_1 = require("./userRoute");
var blogRoute_1 = require("./blogRoute");
var apis = __spreadArray(__spreadArray([], userRoute_1.userRoute, true), blogRoute_1.blogRoute, true);
(0, apiToReadme_1.makeReadme)(apis, {
    readmePath: path.join(__dirname, '../README.md'),
    startComment: 'api-start',
    endComment: 'api-end'
});
