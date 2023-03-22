import { makeDecorator, makeParamDecorator, makePropDecorator } from './decorators';
import { setInjectableDef } from './def';
import { attachInjectFlag } from './injector_compatibility';
import { convertToFactory } from './util';
export var Injectable = makeDecorator('Injectable', function (ref) { return ref; }, function (injectableType, meta) {
    var provDef = { token: injectableType, providedIn: (meta === null || meta === void 0 ? void 0 : meta.providedIn) || 'root', factory: convertToFactory(injectableType, meta) };
    setInjectableDef(injectableType, provDef);
});
export var Inject = attachInjectFlag(makeParamDecorator('Inject', function (token) { return ({ token: token }); }), -1 /* DecoratorFlags.Inject */);
export var Prop = attachInjectFlag(makePropDecorator('Prop', function (token) { return ({ token: token }); }), -1 /* DecoratorPropFlags.Prop */);
