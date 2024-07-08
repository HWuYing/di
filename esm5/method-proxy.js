import { __decorate, __metadata, __spreadArray } from "tslib";
import { NATIVE_METHOD } from './decorators';
import { Inject, Injectable } from './injectable';
import { StaticInjector } from './injector';
import { Injector } from './injector.abstract';
import { injectArgs, saveCurrentInjector } from './injector_compatibility';
import { reflectCapabilities } from './reflection-capabilities';
var MethodProxy = /** @class */ (function () {
    function MethodProxy() {
    }
    MethodProxy.prototype.createAgent = function (type, name, nativeMethod) {
        var _a;
        var _this = this;
        if (nativeMethod.__isProxy__)
            return nativeMethod;
        var proxy = (_a = {},
            _a[name] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var annotations = reflectCapabilities.getParamAnnotations(Object.getPrototypeOf(type).constructor, name);
                return nativeMethod.apply(type, !annotations.length ? args : _this.injectArgs.apply(_this, __spreadArray([annotations], args, false)));
            },
            _a);
        Object.defineProperty(proxy[name], '__isProxy__', { value: true });
        return proxy[name];
    };
    MethodProxy.prototype.injectArgs = function (annotations) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var reInjector = saveCurrentInjector(this.injector);
        try {
            return injectArgs.apply(void 0, __spreadArray([annotations], args, false));
        }
        finally {
            saveCurrentInjector(reInjector);
        }
    };
    MethodProxy.prototype.proxyMethod = function (type, method) {
        var _a;
        var agent = type[method];
        var ctor = Object.getPrototypeOf(type).constructor;
        if (!ctor || !agent || typeof agent !== 'function')
            return agent;
        var native = (_a = ctor[NATIVE_METHOD]) !== null && _a !== void 0 ? _a : {};
        var proxy = this.createAgent(type, method, native[method] || agent);
        if (native[method])
            native[method] = proxy;
        return native[method] ? agent : proxy;
    };
    __decorate([
        Inject(Injector),
        __metadata("design:type", StaticInjector)
    ], MethodProxy.prototype, "injector", void 0);
    MethodProxy = __decorate([
        Injectable()
    ], MethodProxy);
    return MethodProxy;
}());
export { MethodProxy };
