/* eslint-disable no-use-before-define */
import 'reflect-metadata';
import { isUndefined } from 'lodash';
import { Injector } from './injector.abstract';
const reflect = typeof global === "object" ? global.Reflect : typeof self === "object" ? self.Reflect : Reflect;
const designParamtypes = `design:paramtypes`;
export const __PROVIDE__INJECT__ = `design:__provide__inject__`;
export class StaticInjector {
    constructor(parentInjector, options) {
        this.parentInjector = parentInjector;
        this.isSelfContext = false;
        this._recors = new Map();
        this._instanceRecors = new Map();
        this._recors.set(Injector, { token: Injector, fn: () => this });
        this.isSelfContext = options ? options.isScope === 'self' : false;
    }
    get(token, ...params) {
        var _a;
        const record = this._recors.get(token) || ((_a = this.parentInjector) === null || _a === void 0 ? void 0 : _a._recors.get(token));
        return record ? record.fn.apply(this, params) : null;
    }
    set(token, provider) {
        const { provide, useClass, useValue, useFactory } = provider;
        const record = this._recors.get(token) || {};
        record.token = provide;
        if (!isUndefined(useValue)) {
            record.fn = resolveMulitProvider.call(this, provider, record);
        }
        else if (useClass) {
            const recordClass = this._recors.get(useClass) || { fn: resolveClassProvider.call(this, provider) };
            record.fn = recordClass.fn;
        }
        else if (useFactory) {
            record.fn = resolveFactoryProvider.call(this, provider);
        }
        this._recors.set(record.token, record);
    }
    createClass(clazz) {
        const deps = reflect.getMetadata(designParamtypes, clazz) || [];
        const injectTypes = clazz[__PROVIDE__INJECT__] || [];
        const arvgs = deps.map((token) => this.get(token));
        injectTypes.forEach(({ token, index }) => arvgs[index] = this.get(token));
        return new clazz(...arvgs);
    }
    clear() {
        this._recors.clear();
        this._instanceRecors.clear();
        this.parentInjector = void (0);
    }
}
function resolveClassProvider({ useNew = false, useClass }) {
    let instance;
    return function () {
        const isSelfContext = this.isSelfContext;
        let newInstance = isSelfContext ? this._instanceRecors.get(useClass) : instance;
        if (useNew || !newInstance) {
            newInstance = this.createClass(useClass);
            isSelfContext ? this._instanceRecors.set(useClass, newInstance) : instance = newInstance;
        }
        return newInstance;
    };
}
function resolveMulitProvider({ useValue, multi }, { fn = () => [] }) {
    const preValue = fn.call(this);
    return () => multi ? [...preValue, useValue] : useValue;
}
function resolveFactoryProvider({ useFactory, deps = [] }) {
    return function (...params) {
        return useFactory.apply(undefined, [...deps.map((token) => this.get(token)), ...params]);
    };
}
