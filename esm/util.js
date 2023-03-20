import { injectArgs, ɵɵinject } from './injector_compatibility';
import { ReflectionCapabilities } from './reflection-capabilities';
function getDeps(type) {
    const reflectionCapabilities = new ReflectionCapabilities();
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
export function isClassProvider(value) {
    return !!(value && value.useClass);
}
export function convertToFactory(type, provider) {
    if (!provider) {
        const deps = getDeps(type);
        return () => new type(...injectArgs(deps));
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
    return () => new _type(...injectArgs(deps || []));
}
