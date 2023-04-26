"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = exports.Injectable = exports.setInjectableDef = exports.ROOT_SCOPE = void 0;
var tslib_1 = require("tslib");
var decorators_1 = require("./decorators");
var def_1 = require("./def");
var injector_1 = require("./injector");
var injector_compatibility_1 = require("./injector_compatibility");
var util_1 = require("./util");
exports.ROOT_SCOPE = 'root';
var setInjectableDef = function (type, provider) {
    var _a = (provider || {}), _b = _a.providedIn, providedIn = _b === void 0 ? exports.ROOT_SCOPE : _b, nonSingle = _a.nonSingle;
    var injectableDef = { token: type, nonSingle: nonSingle, providedIn: providedIn, factory: (0, util_1.convertToFactory)(type, provider) };
    nonSingle && (injectableDef.flags = injector_1.InjectFlags.NonCache);
    return (0, def_1.setInjectableDef)(type, injectableDef);
};
exports.setInjectableDef = setInjectableDef;
exports.Injectable = (0, decorators_1.makeDecorator)('Injectable', undefined, exports.setInjectableDef);
var mergeInfo = function (token, options) {
    if (options === void 0) { options = {}; }
    return (tslib_1.__assign(tslib_1.__assign({}, options), { token: token }));
};
exports.Inject = (0, injector_compatibility_1.attachInjectFlag)((0, decorators_1.makeParamDecorator)('Inject', mergeInfo), -1 /* DecoratorFlags.Inject */);
