import { __assign, __rest } from "tslib";
import { __PROVIDE__INJECT__, StaticInjector } from './injector';
import { InjectorToken } from './injector-token';
var injector = new StaticInjector();
var toArray = function (obj) { return Array.isArray(obj) ? obj : [obj]; };
var InjectableFactory = function (defaultToken, defaultOptions) {
    return function (token, options) { return function (target) {
        if (!(token instanceof InjectorToken)) {
            token = void (0);
            options = token;
        }
        var _a = options || {}, _b = _a.injector, _injector = _b === void 0 ? injector : _b, _options = __rest(_a, ["injector"]);
        var providers = [token, defaultToken, target].filter(function (item) { return !!item; });
        providers.forEach(function (provide) { return _injector.set(provide, __assign(__assign(__assign({}, defaultOptions), _options), { provide: provide, useClass: target })); });
        return target;
    }; };
};
export var Inject = function (token) { return function (target, name, index) {
    if (!target[__PROVIDE__INJECT__]) {
        target[__PROVIDE__INJECT__] = [];
    }
    target[__PROVIDE__INJECT__].push({ token: token, index: index });
}; };
export var registryProvider = function (provider) { return toArray(provider).forEach(function (p) { return injector.set(p.provide, p); }); };
export var Injectable = InjectableFactory(undefined, { useClass: true, useNew: false });
export var getProvider = function (target) { return injector.get(target); };
