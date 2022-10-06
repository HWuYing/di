"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvider = exports.Injectable = exports.registryProvider = exports.Inject = void 0;
var tslib_1 = require("tslib");
var injector_1 = require("./injector");
var injector_token_1 = require("./injector-token");
var injector = new injector_1.StaticInjector();
var toArray = function (obj) { return Array.isArray(obj) ? obj : [obj]; };
var InjectableFactory = function (defaultToken, defaultOptions) {
    return function (token, options) { return function (target) {
        if (!(token instanceof injector_token_1.InjectorToken)) {
            token = void (0);
            options = token;
        }
        var _a = options || {}, _b = _a.injector, _injector = _b === void 0 ? injector : _b, _options = tslib_1.__rest(_a, ["injector"]);
        var providers = [token, defaultToken, target].filter(function (item) { return !!item; });
        providers.forEach(function (provide) { return _injector.set(provide, tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, defaultOptions), _options), { provide: provide, useClass: target })); });
        return target;
    }; };
};
var Inject = function (token) { return function (target, name, index) {
    if (!target[injector_1.__PROVIDE__INJECT__]) {
        target[injector_1.__PROVIDE__INJECT__] = [];
    }
    target[injector_1.__PROVIDE__INJECT__].push({ token: token, index: index });
}; };
exports.Inject = Inject;
var registryProvider = function (provider) { return toArray(provider).forEach(function (p) { return injector.set(p.provide, p); }); };
exports.registryProvider = registryProvider;
exports.Injectable = InjectableFactory(undefined, { useClass: true, useNew: false });
var getProvider = function (target) { return injector.get(target); };
exports.getProvider = getProvider;
