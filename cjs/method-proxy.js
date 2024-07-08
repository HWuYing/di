"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodProxy = void 0;
var tslib_1 = require("tslib");
var decorators_1 = require("./decorators");
var injectable_1 = require("./injectable");
var injector_1 = require("./injector");
var injector_abstract_1 = require("./injector.abstract");
var injector_compatibility_1 = require("./injector_compatibility");
var reflection_capabilities_1 = require("./reflection-capabilities");
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
                var annotations = reflection_capabilities_1.reflectCapabilities.getParamAnnotations(Object.getPrototypeOf(type).constructor, name);
                return nativeMethod.apply(type, !annotations.length ? args : _this.injectArgs.apply(_this, tslib_1.__spreadArray([annotations], args, false)));
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
        var reInjector = (0, injector_compatibility_1.saveCurrentInjector)(this.injector);
        try {
            return injector_compatibility_1.injectArgs.apply(void 0, tslib_1.__spreadArray([annotations], args, false));
        }
        finally {
            (0, injector_compatibility_1.saveCurrentInjector)(reInjector);
        }
    };
    MethodProxy.prototype.proxyMethod = function (type, method) {
        var _a;
        var agent = type[method];
        var ctor = Object.getPrototypeOf(type).constructor;
        if (!ctor || !agent || typeof agent !== 'function')
            return agent;
        var native = (_a = ctor[decorators_1.NATIVE_METHOD]) !== null && _a !== void 0 ? _a : {};
        var proxy = this.createAgent(type, method, native[method] || agent);
        if (native[method])
            native[method] = proxy;
        return native[method] ? agent : proxy;
    };
    tslib_1.__decorate([
        (0, injectable_1.Inject)(injector_abstract_1.Injector),
        tslib_1.__metadata("design:type", injector_1.StaticInjector)
    ], MethodProxy.prototype, "injector", void 0);
    MethodProxy = tslib_1.__decorate([
        (0, injectable_1.Injectable)()
    ], MethodProxy);
    return MethodProxy;
}());
exports.MethodProxy = MethodProxy;
