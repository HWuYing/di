import { makeDecorator, makeParamDecorator, makePropDecorator } from './decorators';
import { setInjectableDef } from './def';
import { attachInjectFlag } from './injector_compatibility';
import { convertToFactory } from './util';
export const ROOT_SCOPE = 'root';
export const Injectable = makeDecorator('Injectable', (ref) => ref, (injectableType, meta) => {
    const provDef = { token: injectableType, providedIn: (meta === null || meta === void 0 ? void 0 : meta.providedIn) || ROOT_SCOPE, factory: convertToFactory(injectableType, meta) };
    setInjectableDef(injectableType, provDef);
});
export const Inject = attachInjectFlag(makeParamDecorator('Inject', (token) => ({ token })), -1 /* DecoratorFlags.Inject */);
export const Prop = attachInjectFlag(makePropDecorator('Prop', (token) => ({ token })), -1 /* DecoratorPropFlags.Prop */);
