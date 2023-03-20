"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMethodDecorator = exports.makeParamDecorator = exports.makeDecorator = exports.METHODS = exports.PARAMETERS = exports.ANNOTATIONS = void 0;
var tslib_1 = require("tslib");
exports.ANNOTATIONS = '__annotations__';
exports.PARAMETERS = '__parameters__';
exports.METHODS = '__methods__';
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
function makeDecorator(name, props, typeFn) {
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
        var annotationInstance = new ((_a = DecoratorFactory).bind.apply(_a, tslib_1.__spreadArray([void 0], args, false)))();
        return function TypeDecorator(cls) {
            var _type = typeFn && typeFn.apply(void 0, tslib_1.__spreadArray([cls], args, false)) || cls;
            // eslint-disable-next-line max-len
            var annotations = hasOwnProperty(cls, exports.ANNOTATIONS) ? cls[exports.ANNOTATIONS] : Object.defineProperty(cls, exports.ANNOTATIONS, { value: [] })[exports.ANNOTATIONS];
            annotations.push(annotationInstance);
            return _type;
        };
    }
    DecoratorFactory.prototype.metadataName = name;
    return DecoratorFactory;
}
exports.makeDecorator = makeDecorator;
function makeParamDecorator(name, props) {
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
        var annotationInstance = new ((_a = ParamDecoratorFactory).bind.apply(_a, tslib_1.__spreadArray([void 0], args, false)))();
        function ParamDecorator(cls, name, index) {
            // eslint-disable-next-line max-len
            var parameters = hasOwnProperty(cls, exports.PARAMETERS) ? cls[exports.PARAMETERS] : Object.defineProperty(cls, exports.PARAMETERS, { value: [] })[exports.PARAMETERS];
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
exports.makeParamDecorator = makeParamDecorator;
function makeMethodDecorator(name, props, typeFn) {
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
        var annotationInstance = new ((_a = MethodDecoratorFafctory).bind.apply(_a, tslib_1.__spreadArray([void 0], args, false)))();
        function MethodDecorator(prototype, method, descriptor) {
            typeFn && typeFn.apply(void 0, tslib_1.__spreadArray([prototype, method, descriptor], args, false));
            // eslint-disable-next-line max-len
            var methods = hasOwnProperty(prototype, exports.METHODS) ? prototype[exports.METHODS] : Object.defineProperty(prototype, exports.METHODS, { value: [] })[exports.METHODS];
            methods.push({ method: method, descriptor: descriptor, annotationInstance: annotationInstance });
            return prototype;
        }
        MethodDecorator.annotation = annotationInstance;
        return MethodDecorator;
    }
    MethodDecoratorFafctory.prototype.metadataName = name;
    return MethodDecoratorFafctory;
}
exports.makeMethodDecorator = makeMethodDecorator;
