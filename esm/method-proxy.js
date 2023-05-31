import { __decorate } from "tslib";
import { Injectable } from './injectable';
import { injectArgs } from './injector_compatibility';
import { reflectCapabilities } from './reflection-capabilities';
const skipMethodFlag = {};
function loopMain(loopList, handler, adopt, end) {
    function step(result) {
        // eslint-disable-next-line no-use-before-define
        return adopt(result) !== skipMethodFlag && loopList.length ? excel() : end();
    }
    function excel() {
        if (!loopList.length)
            return end();
        const result = handler(loopList.shift());
        (result === null || result === void 0 ? void 0 : result.then) ? result.then(step) : (result === null || result === void 0 ? void 0 : result.subscribe) ? result.subscribe(step) : step(result);
    }
    excel();
}
let MethodProxy = class MethodProxy {
    methodIntercept(annotations, end, ...args) {
        let endResult = true;
        const adopt = (value) => value === skipMethodFlag ? endResult = value : value;
        const handler = ({ annotationInstance }) => annotationInstance === null || annotationInstance === void 0 ? void 0 : annotationInstance.hook(annotationInstance, ...args);
        loopMain([...annotations], handler, adopt, () => end(endResult !== skipMethodFlag));
    }
    _proxyMethod(type, method) {
        const agent = type[method];
        const ctor = Object.getPrototypeOf(type).constructor;
        if (!ctor || !agent || typeof agent !== 'function')
            return (resolve) => resolve(agent);
        const annotations = reflectCapabilities.getParamAnnotations(ctor, method);
        const methodAnnotations = reflectCapabilities.getMethodAnnotations(ctor, method);
        return this.createAgent(annotations, methodAnnotations, (...args) => agent.apply(type, args));
    }
    injectArgs(annotations, ...args) {
        return injectArgs(annotations, ...args);
    }
    createAgent(annotations, methodAnnotations, agent) {
        return (resolve = (value) => value, ...args) => {
            let value;
            const _agent = () => value = agent(...!annotations.length ? args : this.injectArgs(annotations, ...args));
            const end = (result) => resolve(result ? _agent() : undefined);
            this.methodIntercept(methodAnnotations, end, ...args);
            return value;
        };
    }
    proxyMethod(type, method) {
        const agent = this._proxyMethod(type, method);
        return (...args) => agent(undefined, ...args);
    }
    proxyMethodAsync(type, method) {
        return this._proxyMethod(type, method);
    }
};
MethodProxy.skipMethodFlag = skipMethodFlag;
MethodProxy = __decorate([
    Injectable()
], MethodProxy);
export { MethodProxy };
