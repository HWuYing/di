"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prop = exports.Inject = exports.Injectable = exports.ROOT_SCOPE = void 0;
var tslib_1 = require("tslib");
var decorators_1 = require("./decorators");
var def_1 = require("./def");
var injector_compatibility_1 = require("./injector_compatibility");
var util_1 = require("./util");
exports.ROOT_SCOPE = 'root';
exports.Injectable = (0, decorators_1.makeDecorator)('Injectable', function (ref) { return ref; }, function (injectableType, meta) {
    var provDef = { token: injectableType, providedIn: (meta === null || meta === void 0 ? void 0 : meta.providedIn) || exports.ROOT_SCOPE, factory: (0, util_1.convertToFactory)(injectableType, meta) };
    (0, def_1.setInjectableDef)(injectableType, provDef);
});
var mergeInfo = function (token, options) {
    if (options === void 0) { options = {}; }
    return (tslib_1.__assign(tslib_1.__assign({}, options), { token: token }));
};
exports.Inject = (0, injector_compatibility_1.attachInjectFlag)((0, decorators_1.makeParamDecorator)('Inject', mergeInfo), -1 /* DecoratorFlags.Inject */);
exports.Prop = (0, injector_compatibility_1.attachInjectFlag)((0, decorators_1.makePropDecorator)('Prop', mergeInfo), -1 /* DecoratorPropFlags.Prop */);
