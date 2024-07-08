import { __spreadArray } from "tslib";
export var ANNOTATIONS = '__annotations__';
export var PARAMETERS = '__parameters__';
export var METHODS = '__methods__';
export var NATIVE_METHOD = '__native__method__';
export var PROP_METADATA = '__prop__metadata__';
function hasOwnProperty(object, v) {
    return Object.prototype.hasOwnProperty.call(object, v);
}
function getPropertyValue(type, property, defValue) {
    if (defValue === void 0) { defValue = []; }
    return hasOwnProperty(type, property) ? type[property] : Object.defineProperty(type, property, { value: defValue })[property];
}
function makeMetadataCtor(props) {
    return function ctor() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Object.assign(this, props && props.apply(void 0, args));
    };
}
export function makeDecorator(name, props, typeFn) {
    var metaCtor = makeMetadataCtor(props);
    function DecoratorFactory() {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this instanceof DecoratorFactory) {
            return metaCtor.apply(this, args);
        }
        var annotationInstance = new ((_a = DecoratorFactory).bind.apply(_a, __spreadArray([void 0], args, false)))();
        return function TypeDecorator(cls) {
            var annotations = getPropertyValue(cls, ANNOTATIONS);
            annotations.push(annotationInstance);
            typeFn && typeFn.apply(void 0, __spreadArray([cls], args, false));
            return cls;
        };
    }
    DecoratorFactory.prototype.metadataName = name;
    return DecoratorFactory;
}
export function makeParamDecorator(name, props, typeFn) {
    var metaCtor = makeMetadataCtor(props);
    function ParamDecoratorFactory() {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this instanceof ParamDecoratorFactory) {
            return metaCtor.apply(this, args);
        }
        var annotationInstance = new ((_a = ParamDecoratorFactory).bind.apply(_a, __spreadArray([void 0], args, false)))();
        return function ParamOrPropDecorator(cls, method, index) {
            var prop = method;
            var descriptor = index;
            var isParam = typeof index === 'number';
            var ctor = method ? cls.constructor : cls;
            var meta = getPropertyValue(ctor, isParam ? PARAMETERS : PROP_METADATA);
            meta.unshift(isParam ? { method: method || 'constructor', index: index, annotationInstance: annotationInstance } : { prop: prop, descriptor: descriptor, annotationInstance: annotationInstance });
            typeFn && typeFn.apply(void 0, __spreadArray([ctor, method, index], args, false));
        };
    }
    ParamDecoratorFactory.prototype.metadataName = name;
    return ParamDecoratorFactory;
}
export function makeMethodDecorator(name, props, typeFn) {
    var metaCtor = makeMetadataCtor(props);
    function MethodDecoratorFactory() {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this instanceof MethodDecoratorFactory) {
            return metaCtor.apply(this, args);
        }
        var annotationInstance = new ((_a = MethodDecoratorFactory).bind.apply(_a, __spreadArray([void 0], args, false)))();
        return function MethodDecorator(_a, method, descriptor) {
            var ctor = _a.constructor;
            var methods = getPropertyValue(ctor, METHODS);
            var native = getPropertyValue(ctor, NATIVE_METHOD, {});
            if (!native[method]) {
                native[method] = descriptor.value;
                descriptor.value = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return native[method].apply(this, args);
                };
            }
            methods.push({ method: method, descriptor: descriptor, annotationInstance: annotationInstance });
            typeFn && typeFn.apply(void 0, __spreadArray([ctor, method, descriptor], args, false));
        };
    }
    MethodDecoratorFactory.prototype.metadataName = name;
    return MethodDecoratorFactory;
}
export var makePropDecorator = makeParamDecorator;
