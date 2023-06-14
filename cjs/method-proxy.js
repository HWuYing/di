"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodProxy = void 0;
var tslib_1 = require("tslib");
var injectable_1 = require("./injectable");
var injector_compatibility_1 = require("./injector_compatibility");
var reflection_capabilities_1 = require("./reflection-capabilities");
var skipMethodFlag = {};
function loopMain(loopList, handler, adopt, end) {
    function step(result) {
        // eslint-disable-next-line no-use-before-define
        return adopt(result) !== skipMethodFlag && loopList.length ? excel() : end();
    }
    function excel() {
        if (!loopList.length)
            return end();
        var result = handler(loopList.shift());
        (result === null || result === void 0 ? void 0 : result.then) ? result.then(step) : (result === null || result === void 0 ? void 0 : result.subscribe) ? result.subscribe(step) : step(result);
    }
    excel();
}
var MethodProxy = /** @class */ (function () {
    function MethodProxy() {
    }
    MethodProxy.prototype.methodIntercept = function (annotations, end) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var endResult = true;
        var adopt = function (value) { return value === skipMethodFlag ? endResult = value : value; };
        var handler = function (_a) {
            var annotationInstance = _a.annotationInstance;
            return annotationInstance.hook && annotationInstance.hook.apply(annotationInstance, tslib_1.__spreadArray([annotationInstance], args, false));
        };
        loopMain(tslib_1.__spreadArray([], annotations, true), handler, adopt, function () { return end(endResult !== skipMethodFlag); });
    };
    MethodProxy.prototype._proxyMethod = function (type, method) {
        var agent = type[method];
        var ctor = Object.getPrototypeOf(type).constructor;
        if (!ctor || !agent || typeof agent !== 'function')
            return function (resolve) { return resolve(agent); };
        var annotations = reflection_capabilities_1.reflectCapabilities.getParamAnnotations(ctor, method);
        var methodAnnotations = reflection_capabilities_1.reflectCapabilities.getMethodAnnotations(ctor, method);
        return this.createAgent(annotations, methodAnnotations, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return agent.apply(type, args);
        });
    };
    MethodProxy.prototype.injectArgs = function (annotations) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return injector_compatibility_1.injectArgs.apply(void 0, tslib_1.__spreadArray([annotations], args, false));
    };
    MethodProxy.prototype.createAgent = function (annotations, methodAnnotations, agent) {
        var _this = this;
        return function (resolve) {
            if (resolve === void 0) { resolve = function (value) { return value; }; }
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var value;
            var _agent = function () { return value = agent.apply(void 0, !annotations.length ? args : _this.injectArgs.apply(_this, tslib_1.__spreadArray([annotations], args, false))); };
            var end = function (result) { return resolve(result ? _agent() : undefined); };
            _this.methodIntercept.apply(_this, tslib_1.__spreadArray([methodAnnotations, end], args, false));
            return value;
        };
    };
    MethodProxy.prototype.proxyMethod = function (type, method) {
        var agent = this._proxyMethod(type, method);
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return agent.apply(void 0, tslib_1.__spreadArray([undefined], args, false));
        };
    };
    MethodProxy.prototype.proxyMethodAsync = function (type, method) {
        return this._proxyMethod(type, method);
    };
    MethodProxy.skipMethodFlag = skipMethodFlag;
    MethodProxy = tslib_1.__decorate([
        (0, injectable_1.Injectable)()
    ], MethodProxy);
    return MethodProxy;
}());
exports.MethodProxy = MethodProxy;
