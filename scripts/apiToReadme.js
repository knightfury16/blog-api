"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.makeReadme = void 0;
var fs = require("fs");
var codeSnippet = function (lang) {
    return function (content) {
        return '```' + (lang || '') + '\n' + content + '\n```';
    };
};
var makeReadme = function (apis, options) {
    if (options === void 0) { options = {}; }
    var readmePath = options.readmePath, _a = options.startComment, startComment = _a === void 0 ? 'api' : _a, _b = options.endComment, endComment = _b === void 0 ? 'api-end' : _b;
    var md = apis
        .map(function (api) {
        var _a, _b;
        var qString = ((_a = api.queryString) === null || _a === void 0 ? void 0 : _a.length) &&
            '\n| Parameter | Type| Description|\n|----|----|----|\n' +
                ((_b = api.queryString) === null || _b === void 0 ? void 0 : _b.map(function (query) {
                    return "| `".concat(query.name, "` | `").concat(query.type, "` |").concat(query.required ? '**Required**' : '', " ").concat(query.description, "| ");
                }).join('\n'));
        var method = '\n' + codeSnippet(templateObject_1 || (templateObject_1 = __makeTemplateObject(["http"], ["http"])))("".concat(api.method, " ").concat(api.endpoint));
        var authenticated = api.authenticated ? '\n' + codeSnippet(templateObject_2 || (templateObject_2 = __makeTemplateObject(["diff"], ["diff"])))('!Authenticated!') : '';
        var request = api.request && '- Request\n\n' + codeSnippet(templateObject_3 || (templateObject_3 = __makeTemplateObject(["json"], ["json"])))(JSON.stringify(api.request, null, 2));
        var response = api.response && '- Response\n\n' + codeSnippet(templateObject_4 || (templateObject_4 = __makeTemplateObject(["json"], ["json"])))(JSON.stringify(api.response, null, 2));
        return [
            "### **".concat(api.name, "**"),
            api.description,
            qString,
            method,
            authenticated,
            request,
            response
        ].join('\n');
    })
        .join('\n---\n');
    if (!readmePath)
        return md;
    var oldReadme = fs.readFileSync(readmePath, 'utf8');
    var commentStart = new RegExp("<!--\\s*".concat(startComment, "\\s*-->")).exec(oldReadme);
    var commentEnd = new RegExp("<!--\\s*".concat(endComment, "\\s*-->")).exec(oldReadme);
    if (commentStart && commentEnd && commentEnd.index > commentStart.index) {
        var newReadme = "".concat(oldReadme.substring(0, commentStart.index + commentStart[0].length), "\n").concat(md, "\n").concat(oldReadme.substring(commentEnd.index));
        if (newReadme !== oldReadme) {
            fs.writeFileSync(readmePath, newReadme, 'utf8');
        }
        return newReadme;
    }
};
exports.makeReadme = makeReadme;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
