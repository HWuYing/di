"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePropDecorator = exports.makeMethodDecorator = exports.makeParamDecorator = exports.makeDecorator = exports.PROP_METADATA = exports.METHODS = exports.PARAMETERS = exports.ANNOTATIONS = void 0;
var tslib_1 = require("tslib");
exports.ANNOTATIONS = '__annotations__';
exports.PARAMETERS = '__parameters__';
exports.METHODS = '__methods__';
exports.PROP_METADATA = '__prop__metadata__';
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
            var annotations = getPropertyValue(cls, exports.ANNOTATIONS);
            annotations.push(annotationInstance);
            typeFn && typeFn.apply(void 0, tslib_1.__spreadArray([cls], args, false));
            return cls;
        };
    }
    DecoratorFactory.prototype.metadataName = name;
    return DecoratorFactory;
}
exports.makeDecorator = makeDecorator;
function makeParamDecorator(name, props, typeFn) {
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
        return function ParamOrPropDecorator(cls, method, index) {
            var isParam = typeof index === 'number';
            var ctor = method ? cls.constructor : cls;
            var meta = getPropertyValue(ctor, isParam ? exports.PARAMETERS : exports.PROP_METADATA);
            meta.unshift(isParam ? { method: method || 'constructor', index: index, annotationInstance: annotationInstance } : { prop: method, annotationInstance: annotationInstance });
            typeFn && typeFn.apply(void 0, tslib_1.__spreadArray([ctor, method, index], args, false));
        };
    }
    ParamDecoratorFactory.prototype.metadataName = name;
    return ParamDecoratorFactory;
}
exports.makeParamDecorator = makeParamDecorator;
function makeMethodDecorator(name, props, typeFn) {
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
        var annotationInstance = new ((_a = MethodDecoratorFactory).bind.apply(_a, tslib_1.__spreadArray([void 0], args, false)))();
        return function MethodDecorator(_a, method, descriptor) {
            var ctor = _a.constructor;
            var methods = getPropertyValue(ctor, exports.METHODS);
            methods.push({ method: method, descriptor: descriptor, annotationInstance: annotationInstance });
            typeFn && typeFn.apply(void 0, tslib_1.__spreadArray([ctor, method, descriptor], args, false));
        };
    }
    MethodDecoratorFactory.prototype.metadataName = name;
    return MethodDecoratorFactory;
}
exports.makeMethodDecorator = makeMethodDecorator;
exports.makePropDecorator = makeParamDecorator;
