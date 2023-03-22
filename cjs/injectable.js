"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prop = exports.Inject = exports.Injectable = void 0;
var decorators_1 = require("./decorators");
var def_1 = require("./def");
var injector_compatibility_1 = require("./injector_compatibility");
var util_1 = require("./util");
exports.Injectable = (0, decorators_1.makeDecorator)('Injectable', function (ref) { return ref; }, function (injectableType, meta) {
    var provDef = { token: injectableType, providedIn: (meta === null || meta === void 0 ? void 0 : meta.providedIn) || 'root', factory: (0, util_1.convertToFactory)(injectableType, meta) };
    (0, def_1.setInjectableDef)(injectableType, provDef);
});
exports.Inject = (0, injector_compatibility_1.attachInjectFlag)((0, decorators_1.makeParamDecorator)('Inject', function (token) { return ({ token: token }); }), -1 /* DecoratorFlags.Inject */);
exports.Prop = (0, injector_compatibility_1.attachInjectFlag)((0, decorators_1.makePropDecorator)('Prop', function (token) { return ({ token: token }); }), -1 /* DecoratorPropFlags.Prop */);
