import { makeDecorator, makeParamDecorator, makePropDecorator } from './decorators';
import { setInjectableDef } from './def';
import { attachInjectFlag } from './injector_compatibility';
import { convertToFactory } from './util';
export const ROOT_SCOPE = 'root';
export const Injectable = makeDecorator('Injectable', (ref) => ref, (injectableType, meta) => {
    const provDef = { token: injectableType, providedIn: (meta === null || meta === void 0 ? void 0 : meta.providedIn) || ROOT_SCOPE, factory: convertToFactory(injectableType, meta) };
    setInjectableDef(injectableType, provDef);
});
const mergeInfo = (token, options = {}) => (Object.assign(Object.assign({}, options), { token }));
export const Inject = attachInjectFlag(makeParamDecorator('Inject', mergeInfo), -1 /* DecoratorFlags.Inject */);
export const Prop = attachInjectFlag(makePropDecorator('Prop', mergeInfo), -1 /* DecoratorPropFlags.Prop */);
