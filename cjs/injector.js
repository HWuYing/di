"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticInjector = exports.__PROVIDE__INJECT__ = void 0;
/* eslint-disable no-use-before-define */
require("reflect-metadata");
const lodash_1 = require("lodash");
const injector_abstract_1 = require("./injector.abstract");
const reflect = typeof global === "object" ? global.Reflect : typeof self === "object" ? self.Reflect : Reflect;
const designParamtypes = `design:paramtypes`;
exports.__PROVIDE__INJECT__ = `design:__provide__inject__`;
class StaticInjector {
    parentInjector;
    isSelfContext = false;
    _recors = new Map();
    _instanceRecors = new Map();
    constructor(parentInjector, options) {
        this.parentInjector = parentInjector;
        this._recors.set(injector_abstract_1.Injector, { token: injector_abstract_1.Injector, fn: () => this });
        this.isSelfContext = options ? options.isScope === 'self' : false;
    }
    get(token, ...params) {
        const record = this._recors.get(token) || this.parentInjector?._recors.get(token);
        return record ? record.fn.apply(this, params) : null;
    }
    set(token, provider) {
        const { provide, useClass, useValue, useFactory } = provider;
        const record = this._recors.get(token) || {};
        record.token = provide;
        if (!(0, lodash_1.isUndefined)(useValue)) {
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
        const injectTypes = clazz[exports.__PROVIDE__INJECT__] || [];
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
exports.StaticInjector = StaticInjector;
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
