"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToFactory = exports.isClassProvider = void 0;
var tslib_1 = require("tslib");
var injector_compatibility_1 = require("./injector_compatibility");
var reflection_capabilities_1 = require("./reflection-capabilities");
function getDeps(type) {
    var reflectionCapabilities = new reflection_capabilities_1.ReflectionCapabilities();
    return reflectionCapabilities.parameters(type);
}
function isValueProvider(value) {
    return !!(value && typeof value === 'object' && value.useValue);
}
function isExistingProvider(value) {
    return !!(value && typeof value === 'object' && value.useExisting);
}
function isFactoryProvider(value) {
    return !!(value && value.useFactory);
}
function hasDeps(value) {
    return !!(value && value.deps);
}
function isClassProvider(value) {
    return !!(value && value.useClass);
}
exports.isClassProvider = isClassProvider;
function convertToFactory(type, provider) {
    if (!provider) {
        var deps_1 = getDeps(type);
        return function () { return new (type.bind.apply(type, tslib_1.__spreadArray([void 0], (0, injector_compatibility_1.injectArgs)(deps_1), false)))(); };
    }
    if (isValueProvider(provider)) {
        return function () { return provider.useValue; };
    }
    if (isExistingProvider(provider)) {
        return function () { return (0, injector_compatibility_1.ɵɵinject)(provider.useExisting); };
    }
    if (isFactoryProvider(provider)) {
        return function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return provider.useFactory.apply(provider, tslib_1.__spreadArray(tslib_1.__spreadArray([], (0, injector_compatibility_1.injectArgs)(provider.deps || []), false), params, false));
        };
    }
    var _type = isClassProvider(provider) ? provider.useClass : type;
    var deps = hasDeps(provider) ? provider.deps : getDeps(_type);
    return function () { return new (_type.bind.apply(_type, tslib_1.__spreadArray([void 0], (0, injector_compatibility_1.injectArgs)(deps || []), false)))(); };
}
exports.convertToFactory = convertToFactory;
