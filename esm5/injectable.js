import { __assign } from "tslib";
import { makeDecorator, makeParamDecorator, makePropDecorator } from './decorators';
import { setInjectableDef } from './def';
import { attachInjectFlag } from './injector_compatibility';
import { convertToFactory } from './util';
export var ROOT_SCOPE = 'root';
export var Injectable = makeDecorator('Injectable', function (ref) { return ref; }, function (injectableType, meta) {
    var provDef = { token: injectableType, providedIn: (meta === null || meta === void 0 ? void 0 : meta.providedIn) || ROOT_SCOPE, factory: convertToFactory(injectableType, meta) };
    setInjectableDef(injectableType, provDef);
});
var mergeInfo = function (token, options) {
    if (options === void 0) { options = {}; }
    return (__assign(__assign({}, options), { token: token }));
};
export var Inject = attachInjectFlag(makeParamDecorator('Inject', mergeInfo), -1 /* DecoratorFlags.Inject */);
export var Prop = attachInjectFlag(makePropDecorator('Prop', mergeInfo), -1 /* DecoratorPropFlags.Prop */);
