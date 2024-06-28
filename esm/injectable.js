import { makeDecorator, makeParamDecorator } from './decorators';
import { setInjectableDef as _setInjectableDef } from './def';
import { InjectFlags } from './injector';
import { attachInjectFlag } from './injector_compatibility';
import { convertToFactory } from './util';
export const ROOT_SCOPE = 'root';
export const setInjectableDef = (type, provider) => {
    const { providedIn = ROOT_SCOPE, nonSingle } = (provider || {});
    const injectableDef = { token: type, nonSingle, providedIn, factory: convertToFactory(type, provider) };
    nonSingle && (injectableDef.flags = InjectFlags.NonCache);
    return _setInjectableDef(type, injectableDef);
};
export const Injectable = makeDecorator('Injectable', (provider) => provider, setInjectableDef);
const mergeInfo = (token, options = {}) => (Object.assign(Object.assign({}, options), { token }));
export const Inject = attachInjectFlag(makeParamDecorator('Inject', mergeInfo), -1 /* DecoratorFlags.Inject */);
