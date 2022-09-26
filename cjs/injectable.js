"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvider = exports.Injectable = exports.registryProvider = exports.Inject = void 0;
const injector_1 = require("./injector");
const injector_token_1 = require("./injector-token");
const injector = new injector_1.StaticInjector();
const toArray = (obj) => Array.isArray(obj) ? obj : [obj];
const InjectableFactory = (defaultToken, defaultOptions) => (token, options) => (target) => {
    if (!(token instanceof injector_token_1.InjectorToken)) {
        token = void (0);
        options = token;
    }
    const { injector: _injector = injector, ..._options } = options || {};
    const providers = [token, defaultToken, target].filter((item) => !!item);
    providers.forEach((provide) => _injector.set(provide, { ...defaultOptions, ..._options, provide, useClass: target }));
    return target;
};
const Inject = (token) => (target, name, index) => {
    if (!target[injector_1.__PROVIDE__INJECT__]) {
        target[injector_1.__PROVIDE__INJECT__] = [];
    }
    target[injector_1.__PROVIDE__INJECT__].push({ token, index });
};
exports.Inject = Inject;
const registryProvider = (provider) => toArray(provider).forEach((p) => injector.set(p.provide, p));
exports.registryProvider = registryProvider;
exports.Injectable = InjectableFactory(undefined, { useClass: true, useNew: false });
const getProvider = (target) => injector.get(target);
exports.getProvider = getProvider;
