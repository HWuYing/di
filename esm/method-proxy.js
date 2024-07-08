import { __decorate, __metadata } from "tslib";
import { NATIVE_METHOD } from './decorators';
import { Inject, Injectable } from './injectable';
import { StaticInjector } from './injector';
import { Injector } from './injector.abstract';
import { injectArgs, saveCurrentInjector } from './injector_compatibility';
import { reflectCapabilities } from './reflection-capabilities';
let MethodProxy = class MethodProxy {
    createAgent(type, name, nativeMethod) {
        if (nativeMethod.__isProxy__)
            return nativeMethod;
        const proxy = {
            [name]: (...args) => {
                const annotations = reflectCapabilities.getParamAnnotations(Object.getPrototypeOf(type).constructor, name);
                return nativeMethod.apply(type, !annotations.length ? args : this.injectArgs(annotations, ...args));
            }
        };
        Object.defineProperty(proxy[name], '__isProxy__', { value: true });
        return proxy[name];
    }
    injectArgs(annotations, ...args) {
        const reInjector = saveCurrentInjector(this.injector);
        try {
            return injectArgs(annotations, ...args);
        }
        finally {
            saveCurrentInjector(reInjector);
        }
    }
    proxyMethod(type, method) {
        var _a;
        const agent = type[method];
        const ctor = Object.getPrototypeOf(type).constructor;
        if (!ctor || !agent || typeof agent !== 'function')
            return agent;
        const native = (_a = ctor[NATIVE_METHOD]) !== null && _a !== void 0 ? _a : {};
        const proxy = this.createAgent(type, method, native[method] || agent);
        if (native[method])
            native[method] = proxy;
        return native[method] ? agent : proxy;
    }
};
__decorate([
    Inject(Injector),
    __metadata("design:type", StaticInjector)
], MethodProxy.prototype, "injector", void 0);
MethodProxy = __decorate([
    Injectable()
], MethodProxy);
export { MethodProxy };
