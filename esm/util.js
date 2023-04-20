import { injectArgs, ɵɵinject, propArgs } from './injector_compatibility';
import { reflectCapabilities } from './reflection-capabilities';
function getDeps(type) {
    return reflectCapabilities.parameters(type);
}
function getPropMetadata(type) {
    return reflectCapabilities.properties(type);
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
const empty = {};
function factory(deps, type) {
    let _m = empty;
    return () => {
        if (_m !== empty)
            return _m;
        const m = propArgs(_m = new type(...injectArgs(deps)), getPropMetadata(type));
        _m = empty;
        return m;
    };
}
export function convertToFactory(type, provider) {
    if (!provider) {
        const deps = getDeps(type);
        return factory(deps, type);
    }
    if (isValueProvider(provider)) {
        return () => provider.useValue;
    }
    if (isExistingProvider(provider)) {
        return () => ɵɵinject(provider.useExisting);
    }
    if (isFactoryProvider(provider)) {
        return (...params) => provider.useFactory(...injectArgs(provider.deps || []), ...params);
    }
    const _type = isClassProvider(provider) ? provider.useClass : type;
    const deps = hasDeps(provider) ? provider.deps : getDeps(_type);
    return factory(deps, _type);
}
