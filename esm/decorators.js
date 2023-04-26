export const ANNOTATIONS = '__annotations__';
export const PARAMETERS = '__parameters__';
export const METHODS = '__methods__';
export const PROP_METADATA = '__prop__metadata__';
function hasOwnProperty(object, v) {
    return Object.prototype.hasOwnProperty.call(object, v);
}
function getPropertyValue(type, property, defValue = []) {
    return hasOwnProperty(type, property) ? type[property] : Object.defineProperty(type, property, { value: defValue })[property];
}
function makeMetadataCtor(props) {
    return function ctor(...args) {
        return Object.assign(this, props && props(...args));
    };
}
export function makeDecorator(name, props, typeFn) {
    const metaCtor = makeMetadataCtor(props);
    function DecoratorFactory(...args) {
        if (this instanceof DecoratorFactory) {
            return metaCtor.apply(this, args);
        }
        const annotationInstance = new DecoratorFactory(...args);
        return function TypeDecorator(cls) {
            const annotations = getPropertyValue(cls, ANNOTATIONS);
            annotations.push(annotationInstance);
            typeFn && typeFn(cls, ...args);
            return cls;
        };
    }
    DecoratorFactory.prototype.metadataName = name;
    return DecoratorFactory;
}
export function makeParamDecorator(name, props, typeFn) {
    const metaCtor = makeMetadataCtor(props);
    function ParamDecoratorFactory(...args) {
        if (this instanceof ParamDecoratorFactory) {
            return metaCtor.apply(this, args);
        }
        const annotationInstance = new ParamDecoratorFactory(...args);
        return function ParamOrPropDecorator(cls, method, index) {
            const isProp = typeof index === 'undefined';
            const ctor = isProp || method ? cls.constructor : cls;
            const meta = getPropertyValue(ctor, isProp ? PROP_METADATA : PARAMETERS);
            meta.unshift(isProp ? { prop: method, annotationInstance } : { method: method || 'constructor', index, annotationInstance });
            typeFn && typeFn(ctor, method, ...args.concat(isProp ? [] : index));
        };
    }
    ParamDecoratorFactory.prototype.metadataName = name;
    return ParamDecoratorFactory;
}
export function makeMethodDecorator(name, props, typeFn) {
    const metaCtor = makeMetadataCtor(props);
    function MethodDecoratorFactory(...args) {
        if (this instanceof MethodDecoratorFactory) {
            return metaCtor.apply(this, args);
        }
        const annotationInstance = new MethodDecoratorFactory(...args);
        return function MethodDecorator({ constructor: ctor }, method, descriptor) {
            const methods = getPropertyValue(ctor, METHODS);
            methods.push({ method, descriptor, annotationInstance });
            typeFn && typeFn(ctor, method, descriptor, ...args);
        };
    }
    MethodDecoratorFactory.prototype.metadataName = name;
    return MethodDecoratorFactory;
}
export const makePropDecorator = makeParamDecorator;
