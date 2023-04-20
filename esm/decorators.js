export const ANNOTATIONS = '__annotations__';
export const PARAMETERS = '__parameters__';
export const METHODS = '__methods__';
export const PROP_METADATA = '__prop__metadata__';
function hasOwnProperty(object, v) {
    return Object.prototype.hasOwnProperty.call(object, v);
}
function makeMetadataCtor(props) {
    return function ctor(...args) {
        if (props) {
            const values = props(...args);
            for (const propName in values) {
                this[propName] = values[propName];
            }
        }
        return this;
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
            const annotations = hasOwnProperty(cls, ANNOTATIONS) ? cls[ANNOTATIONS] : Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];
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
        function ParamDecorator(cls, method, index) {
            const ctor = method ? cls.constructor : cls;
            const parameters = hasOwnProperty(ctor, PARAMETERS) ? ctor[PARAMETERS] : Object.defineProperty(ctor, PARAMETERS, { value: [] })[PARAMETERS];
            parameters.unshift({ method: method || 'constructor', index, annotationInstance });
            typeFn && typeFn(ctor, method, index, ...args);
        }
        ParamDecorator.annotation = annotationInstance;
        return ParamDecorator;
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
        function MethodDecorator({ constructor }, method, descriptor) {
            const methods = hasOwnProperty(constructor, METHODS) ? constructor[METHODS] : Object.defineProperty(constructor, METHODS, { value: [] })[METHODS];
            methods.push({ method, descriptor, annotationInstance });
            typeFn && typeFn(constructor, method, descriptor, ...args);
        }
        MethodDecorator.annotation = annotationInstance;
        return MethodDecorator;
    }
    MethodDecoratorFactory.prototype.metadataName = name;
    return MethodDecoratorFactory;
}
export function makePropDecorator(name, props, typeFn) {
    const metaCtor = makeMetadataCtor(props);
    function PropDecoratorFactory(...args) {
        if (this instanceof PropDecoratorFactory) {
            return metaCtor.apply(this, args);
        }
        const annotationInstance = new PropDecoratorFactory(...args);
        function PropDecorator({ constructor: ctor }, prop) {
            const meta = hasOwnProperty(ctor, PROP_METADATA) ? ctor[PROP_METADATA] : Object.defineProperty(ctor, PROP_METADATA, { value: [] })[PROP_METADATA];
            meta.unshift({ prop, annotationInstance });
            typeFn && typeFn(ctor, prop, ...args);
        }
        PropDecorator.annotation = annotationInstance;
        return PropDecorator;
    }
    PropDecoratorFactory.prototype.metadataName = name;
    return PropDecoratorFactory;
}
