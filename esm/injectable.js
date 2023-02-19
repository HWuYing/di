import { makeDecorator, makeParamDecorator } from './decorators';
import { setInjectableDef } from './def';
import { attachInjectFlag } from './injector_compatibility';
import { covertToFactory } from './util';
export const Injectable = makeDecorator('Injectable', (ref) => ref, (injectableType, meta) => {
    const provDef = { token: injectableType, providedIn: (meta === null || meta === void 0 ? void 0 : meta.providedIn) || 'root', factory: covertToFactory(injectableType, meta) };
    setInjectableDef(injectableType, provDef);
});
export const Inject = attachInjectFlag(makeParamDecorator('Inject', (token) => ({ token })), -1 /* DecoratorFlags.Inject */);
