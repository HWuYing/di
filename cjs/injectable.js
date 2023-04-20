"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prop = exports.Inject = exports.Injectable = exports.setInjectableDef = exports.ROOT_SCOPE = void 0;
var tslib_1 = require("tslib");
var decorators_1 = require("./decorators");
var def_1 = require("./def");
var injector_compatibility_1 = require("./injector_compatibility");
var util_1 = require("./util");
exports.ROOT_SCOPE = 'root';
var setInjectableDef = function (type, provider) {
    var _a = (provider || {}).providedIn, providedIn = _a === void 0 ? exports.ROOT_SCOPE : _a;
    return (0, def_1.setInjectableDef)(type, { token: type, providedIn: providedIn, factory: (0, util_1.convertToFactory)(type, provider) });
};
exports.setInjectableDef = setInjectableDef;
exports.Injectable = (0, decorators_1.makeDecorator)('Injectable', undefined, function (injectableType, meta) {
    (0, exports.setInjectableDef)(injectableType, meta);
});
var mergeInfo = function (token, options) {
    if (options === void 0) { options = {}; }
    return (tslib_1.__assign(tslib_1.__assign({}, options), { token: token }));
};
exports.Inject = (0, injector_compatibility_1.attachInjectFlag)((0, decorators_1.makeParamDecorator)('Inject', mergeInfo), -1 /* DecoratorFlags.Inject */);
exports.Prop = (0, injector_compatibility_1.attachInjectFlag)((0, decorators_1.makePropDecorator)('Prop', mergeInfo), -1 /* DecoratorPropFlags.Prop */);
