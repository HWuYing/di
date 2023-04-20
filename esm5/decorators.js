import { __spreadArray } from "tslib";
export var ANNOTATIONS = '__annotations__';
export var PARAMETERS = '__parameters__';
export var METHODS = '__methods__';
export var PROP_METADATA = '__prop__metadata__';
function hasOwnProperty(object, v) {
    return Object.prototype.hasOwnProperty.call(object, v);
}
function makeMetadataCtor(props) {
    return function ctor() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (props) {
            var values = props.apply(void 0, args);
            for (var propName in values) {
                this[propName] = values[propName];
            }
        }
        return this;
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
            var annotations = hasOwnProperty(cls, ANNOTATIONS) ? cls[ANNOTATIONS] : Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];
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
        function ParamDecorator(cls, method, index) {
            var ctor = method ? cls.constructor : cls;
            var parameters = hasOwnProperty(ctor, PARAMETERS) ? ctor[PARAMETERS] : Object.defineProperty(ctor, PARAMETERS, { value: [] })[PARAMETERS];
            parameters.unshift({ method: method || 'constructor', index: index, annotationInstance: annotationInstance });
            typeFn && typeFn.apply(void 0, __spreadArray([ctor, method, index], args, false));
        }
        ParamDecorator.annotation = annotationInstance;
        return ParamDecorator;
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
        function MethodDecorator(_a, method, descriptor) {
            var constructor = _a.constructor;
            var methods = hasOwnProperty(constructor, METHODS) ? constructor[METHODS] : Object.defineProperty(constructor, METHODS, { value: [] })[METHODS];
            methods.push({ method: method, descriptor: descriptor, annotationInstance: annotationInstance });
            typeFn && typeFn.apply(void 0, __spreadArray([constructor, method, descriptor], args, false));
        }
        MethodDecorator.annotation = annotationInstance;
        return MethodDecorator;
    }
    MethodDecoratorFactory.prototype.metadataName = name;
    return MethodDecoratorFactory;
}
export function makePropDecorator(name, props, typeFn) {
    var metaCtor = makeMetadataCtor(props);
    function PropDecoratorFactory() {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this instanceof PropDecoratorFactory) {
            return metaCtor.apply(this, args);
        }
        var annotationInstance = new ((_a = PropDecoratorFactory).bind.apply(_a, __spreadArray([void 0], args, false)))();
        function PropDecorator(_a, prop) {
            var ctor = _a.constructor;
            var meta = hasOwnProperty(ctor, PROP_METADATA) ? ctor[PROP_METADATA] : Object.defineProperty(ctor, PROP_METADATA, { value: [] })[PROP_METADATA];
            meta.unshift({ prop: prop, annotationInstance: annotationInstance });
            typeFn && typeFn.apply(void 0, __spreadArray([ctor, prop], args, false));
        }
        PropDecorator.annotation = annotationInstance;
        return PropDecorator;
    }
    PropDecoratorFactory.prototype.metadataName = name;
    return PropDecoratorFactory;
}
