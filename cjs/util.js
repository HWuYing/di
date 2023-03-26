"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToFactory = exports.isClassProvider = void 0;
var tslib_1 = require("tslib");
var injector_compatibility_1 = require("./injector_compatibility");
var reflection_capabilities_1 = require("./reflection-capabilities");
var _reflect = null;
function getReflect() {
    return (_reflect = _reflect || new reflection_capabilities_1.ReflectionCapabilities());
}
function getDeps(type) {
    return getReflect().parameters(type);
}
function getPropMetadata(type) {
    return getReflect().propMetadata(type);
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
var empty = {};
function factory(deps, type) {
    var _m = empty;
    return function () {
        if (_m !== empty)
            return _m;
        var m = new (type.bind.apply(type, tslib_1.__spreadArray([void 0], (0, injector_compatibility_1.injectArgs)(deps), false)))();
        (0, injector_compatibility_1.propArgs)(_m = m, getPropMetadata(type));
        _m = empty;
        return m;
    };
}
function convertToFactory(type, provider) {
    if (!provider) {
        var deps_1 = getDeps(type);
        return factory(deps_1, type);
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
    return factory(deps, _type);
}
exports.convertToFactory = convertToFactory;
