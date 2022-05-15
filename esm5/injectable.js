import { __PROVIDE__INJECT__, __PROVIDER_TYPE__, __USECLASS__, StaticInjector } from './injector';
import { InjectorToken } from './injector-token';
const injector = new StaticInjector();
const toArray = (obj) => Array.isArray(obj) ? obj : [obj];
const InjectableFactory = (defaultToken, defaultOptions) => (token, options) => (target) => {
    if (!(token instanceof InjectorToken)) {
        token = void (0);
        options = token;
    }
    const { injector: _injector = injector, ..._options } = options || {};
    const providers = [token, defaultToken, target].filter((item) => !!item);
    target[__PROVIDER_TYPE__] = __USECLASS__;
    providers.forEach((provide) => _injector.set(provide, { ...defaultOptions, ..._options, provide, useClass: target }));
    return target;
};
export const Inject = (token) => (target, name, index) => {
    if (!target[__PROVIDE__INJECT__]) {
        target[__PROVIDE__INJECT__] = [];
    }
    target[__PROVIDE__INJECT__].push({ token, index });
};
export const registryProvider = (provider) => toArray(provider).forEach((p) => injector.set(p.provide, p));
export const Injectable = InjectableFactory(undefined, { useClass: true, useNew: false });
export const getProvider = (target) => injector.get(target);
