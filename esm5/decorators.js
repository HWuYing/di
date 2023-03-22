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
            var _type = typeFn && typeFn.apply(void 0, __spreadArray([cls], args, false)) || cls;
            // eslint-disable-next-line max-len
            var annotations = hasOwnProperty(cls, ANNOTATIONS) ? cls[ANNOTATIONS] : Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];
            annotations.push(annotationInstance);
            return _type;
        };
    }
    DecoratorFactory.prototype.metadataName = name;
    return DecoratorFactory;
}
export function makeParamDecorator(name, props) {
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
        function ParamDecorator(cls, name, index) {
            // eslint-disable-next-line max-len
            var parameters = hasOwnProperty(cls, PARAMETERS) ? cls[PARAMETERS] : Object.defineProperty(cls, PARAMETERS, { value: [] })[PARAMETERS];
            while (parameters.length <= index)
                parameters.push(null);
            (parameters[index] = parameters[index] || []).push(annotationInstance);
            return cls;
        }
        ParamDecorator.annotation = annotationInstance;
        return ParamDecorator;
    }
    ParamDecoratorFactory.prototype.metadataName = name;
    return ParamDecoratorFactory;
}
export function makeMethodDecorator(name, props, typeFn) {
    var metaCtor = makeMetadataCtor(props);
    function MethodDecoratorFafctory() {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this instanceof MethodDecoratorFafctory) {
            return metaCtor.apply(this, args);
        }
        var annotationInstance = new ((_a = MethodDecoratorFafctory).bind.apply(_a, __spreadArray([void 0], args, false)))();
        function MethodDecorator(_a, method, descriptor) {
            var constructor = _a.constructor;
            typeFn && typeFn.apply(void 0, __spreadArray([constructor, method, descriptor], args, false));
            // eslint-disable-next-line max-len
            var methods = hasOwnProperty(constructor, METHODS) ? constructor[METHODS] : Object.defineProperty(constructor, METHODS, { value: [] })[METHODS];
            methods.push({ method: method, descriptor: descriptor, annotationInstance: annotationInstance });
        }
        MethodDecorator.annotation = annotationInstance;
        return MethodDecorator;
    }
    MethodDecoratorFafctory.prototype.metadataName = name;
    return MethodDecoratorFafctory;
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
            var constructor = _a.constructor;
            typeFn && typeFn.apply(void 0, __spreadArray([constructor, prop], args, false));
            // eslint-disable-next-line max-len
            var meta = hasOwnProperty(constructor, PROP_METADATA) ? constructor[PROP_METADATA] : Object.defineProperty(constructor, PROP_METADATA, { value: {} })[PROP_METADATA];
            // eslint-disable-next-line no-prototype-builtins
            meta[prop] = meta.hasOwnProperty(prop) && meta[prop] || [];
            meta[prop].unshift(annotationInstance);
        }
        return PropDecorator;
    }
    PropDecoratorFactory.prototype.metadataName = name;
    return PropDecoratorFactory;
}
