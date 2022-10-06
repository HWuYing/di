import { __spreadArray } from "tslib";
/* eslint-disable no-use-before-define */
import 'reflect-metadata';
import { isUndefined } from 'lodash';
import { Injector } from './injector.abstract';
var reflect = typeof global === "object" ? global.Reflect : typeof self === "object" ? self.Reflect : Reflect;
var designParamtypes = "design:paramtypes";
export var __PROVIDE__INJECT__ = "design:__provide__inject__";
var StaticInjector = /** @class */ (function () {
    function StaticInjector(parentInjector, options) {
        var _this = this;
        this.parentInjector = parentInjector;
        this.isSelfContext = false;
        this._recors = new Map();
        this._instanceRecors = new Map();
        this._recors.set(Injector, { token: Injector, fn: function () { return _this; } });
        this.isSelfContext = options ? options.isScope === 'self' : false;
    }
    StaticInjector.prototype.get = function (token) {
        var _a;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var record = this._recors.get(token) || ((_a = this.parentInjector) === null || _a === void 0 ? void 0 : _a._recors.get(token));
        return record ? record.fn.apply(this, params) : null;
    };
    StaticInjector.prototype.set = function (token, provider) {
        var _a = provider, provide = _a.provide, useClass = _a.useClass, useValue = _a.useValue, useFactory = _a.useFactory;
        var record = this._recors.get(token) || {};
        record.token = provide;
        if (!isUndefined(useValue)) {
            record.fn = resolveMulitProvider.call(this, provider, record);
        }
        else if (useClass) {
            var recordClass = this._recors.get(useClass) || { fn: resolveClassProvider.call(this, provider) };
            record.fn = recordClass.fn;
        }
        else if (useFactory) {
            record.fn = resolveFactoryProvider.call(this, provider);
        }
        this._recors.set(record.token, record);
    };
    StaticInjector.prototype.createClass = function (clazz) {
        var _this = this;
        var deps = reflect.getMetadata(designParamtypes, clazz) || [];
        var injectTypes = clazz[__PROVIDE__INJECT__] || [];
        var arvgs = deps.map(function (token) { return _this.get(token); });
        injectTypes.forEach(function (_a) {
            var token = _a.token, index = _a.index;
            return arvgs[index] = _this.get(token);
        });
        return new (clazz.bind.apply(clazz, __spreadArray([void 0], arvgs, false)))();
    };
    StaticInjector.prototype.clear = function () {
        this._recors.clear();
        this._instanceRecors.clear();
        this.parentInjector = void (0);
    };
    return StaticInjector;
}());
export { StaticInjector };
function resolveClassProvider(_a) {
    var _b = _a.useNew, useNew = _b === void 0 ? false : _b, useClass = _a.useClass;
    var instance;
    return function () {
        var isSelfContext = this.isSelfContext;
        var newInstance = isSelfContext ? this._instanceRecors.get(useClass) : instance;
        if (useNew || !newInstance) {
            newInstance = this.createClass(useClass);
            isSelfContext ? this._instanceRecors.set(useClass, newInstance) : instance = newInstance;
        }
        return newInstance;
    };
}
function resolveMulitProvider(_a, _b) {
    var useValue = _a.useValue, multi = _a.multi;
    var _c = _b.fn, fn = _c === void 0 ? function () { return []; } : _c;
    var preValue = fn.call(this);
    return function () { return multi ? __spreadArray(__spreadArray([], preValue, true), [useValue], false) : useValue; };
}
function resolveFactoryProvider(_a) {
    var useFactory = _a.useFactory, _b = _a.deps, deps = _b === void 0 ? [] : _b;
    return function () {
        var _this = this;
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return useFactory.apply(undefined, __spreadArray(__spreadArray([], deps.map(function (token) { return _this.get(token); }), true), params, true));
    };
}
