import { __spreadArray } from "tslib";
import { injectArgs, ɵɵinject, propArgs } from './injector_compatibility';
import { ReflectionCapabilities } from './reflection-capabilities';
var _reflect = null;
function getReflect() {
    return (_reflect = _reflect || new ReflectionCapabilities());
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
export function isClassProvider(value) {
    return !!(value && value.useClass);
}
export function convertToFactory(type, provider) {
    if (!provider) {
        var deps_1 = getDeps(type);
        return function () { return propArgs(new (type.bind.apply(type, __spreadArray([void 0], injectArgs(deps_1), false)))(), getPropMetadata(type)); };
    }
    if (isValueProvider(provider)) {
        return function () { return provider.useValue; };
    }
    if (isExistingProvider(provider)) {
        return function () { return ɵɵinject(provider.useExisting); };
    }
    if (isFactoryProvider(provider)) {
        return function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return provider.useFactory.apply(provider, __spreadArray(__spreadArray([], injectArgs(provider.deps || []), false), params, false));
        };
    }
    var _type = isClassProvider(provider) ? provider.useClass : type;
    var deps = hasDeps(provider) ? provider.deps : getDeps(_type);
    return function () { return propArgs(new (_type.bind.apply(_type, __spreadArray([void 0], injectArgs(deps || []), false)))(), getPropMetadata(_type)); };
}
