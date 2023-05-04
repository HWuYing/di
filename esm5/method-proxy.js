import { __decorate, __spreadArray } from "tslib";
import { Injectable } from './injectable';
import { injectArgs } from './injector_compatibility';
import { reflectCapabilities } from './reflection-capabilities';
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
        function handler(annotation) {
            var annotationInstance = annotation.annotationInstance;
            return annotationInstance === null || annotationInstance === void 0 ? void 0 : annotationInstance.hook.apply(annotationInstance, __spreadArray([annotationInstance], args, false));
        }
        loopMain(__spreadArray([], annotations, true), handler, adopt, function () { return end(endResult !== skipMethodFlag); });
    };
    MethodProxy.prototype._proxyMethod = function (type, method, agent) {
        if (!type || !agent || typeof agent !== 'function')
            return function (resolve) { return resolve(agent); };
        var annotations = reflectCapabilities.getParamAnnotations(type, method);
        var methodAnnotations = reflectCapabilities.getMethodAnnotations(type, method);
        return this.createAgent(annotations, methodAnnotations, agent);
    };
    MethodProxy.prototype.injectArgs = function (annotations) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return injectArgs.apply(void 0, __spreadArray([annotations], args, false));
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
            var _agent = function () { return value = agent.apply(void 0, !annotations.length ? args : _this.injectArgs.apply(_this, __spreadArray([annotations], args, false))); };
            var end = function (result) { return resolve(result ? _agent() : undefined); };
            _this.methodIntercept.apply(_this, __spreadArray([methodAnnotations, end], args, false));
            return value;
        };
    };
    MethodProxy.prototype.proxyMethod = function (type, method, agent) {
        var _agent = this._proxyMethod(type, method, agent);
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _agent.apply(void 0, __spreadArray([undefined], args, false));
        };
    };
    MethodProxy.prototype.proxyMethodAsync = function (type, method, agent) {
        var _agent = this._proxyMethod(type, method, agent);
        return function (resolve) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return _agent.apply(void 0, __spreadArray([resolve], args, false));
        };
    };
    MethodProxy.skipMethodFlag = skipMethodFlag;
    MethodProxy = __decorate([
        Injectable()
    ], MethodProxy);
    return MethodProxy;
}());
export { MethodProxy };
