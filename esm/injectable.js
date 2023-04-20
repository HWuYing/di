import { makeDecorator, makeParamDecorator, makePropDecorator } from './decorators';
import { setInjectableDef as _setInjectableDef } from './def';
import { attachInjectFlag } from './injector_compatibility';
import { convertToFactory } from './util';
export const ROOT_SCOPE = 'root';
export const setInjectableDef = (type, provider) => {
    const { providedIn = ROOT_SCOPE } = provider || {};
    return _setInjectableDef(type, { token: type, providedIn, factory: convertToFactory(type, provider) });
};
export const Injectable = makeDecorator('Injectable', undefined, (injectableType, meta) => {
    setInjectableDef(injectableType, meta);
});
const mergeInfo = (token, options = {}) => (Object.assign(Object.assign({}, options), { token }));
export const Inject = attachInjectFlag(makeParamDecorator('Inject', mergeInfo), -1 /* DecoratorFlags.Inject */);
export const Prop = attachInjectFlag(makePropDecorator('Prop', mergeInfo), -1 /* DecoratorPropFlags.Prop */);
