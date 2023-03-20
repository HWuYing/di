export const ANNOTATIONS = '__annotations__';
export const PARAMETERS = '__parameters__';
export const METHODS = '__methods__';
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
            const _type = typeFn && typeFn(cls, ...args) || cls;
            // eslint-disable-next-line max-len
            const annotations = hasOwnProperty(cls, ANNOTATIONS) ? cls[ANNOTATIONS] : Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];
            annotations.push(annotationInstance);
            return _type;
        };
    }
    DecoratorFactory.prototype.metadataName = name;
    return DecoratorFactory;
}
export function makeParamDecorator(name, props) {
    const metaCtor = makeMetadataCtor(props);
    function ParamDecoratorFactory(...args) {
        if (this instanceof ParamDecoratorFactory) {
            return metaCtor.apply(this, args);
        }
        const annotationInstance = new ParamDecoratorFactory(...args);
        function ParamDecorator(cls, name, index) {
            // eslint-disable-next-line max-len
            const parameters = hasOwnProperty(cls, PARAMETERS) ? cls[PARAMETERS] : Object.defineProperty(cls, PARAMETERS, { value: [] })[PARAMETERS];
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
    const metaCtor = makeMetadataCtor(props);
    function MethodDecoratorFafctory(...args) {
        if (this instanceof MethodDecoratorFafctory) {
            return metaCtor.apply(this, args);
        }
        const annotationInstance = new MethodDecoratorFafctory(...args);
        function MethodDecorator(prototype, method, descriptor) {
            typeFn && typeFn(prototype, method, descriptor, ...args);
            // eslint-disable-next-line max-len
            const methods = hasOwnProperty(prototype, METHODS) ? prototype[METHODS] : Object.defineProperty(prototype, METHODS, { value: [] })[METHODS];
            methods.push({ method, descriptor, annotationInstance });
            return prototype;
        }
        MethodDecorator.annotation = annotationInstance;
        return MethodDecorator;
    }
    MethodDecoratorFafctory.prototype.metadataName = name;
    return MethodDecoratorFafctory;
}
