import { __assign } from "tslib";
import { makeDecorator, makeParamDecorator, makePropDecorator } from './decorators';
import { setInjectableDef as _setInjectableDef } from './def';
import { InjectFlags } from './injector';
import { attachInjectFlag } from './injector_compatibility';
import { convertToFactory } from './util';
export var ROOT_SCOPE = 'root';
export var setInjectableDef = function (type, provider) {
    var _a = (provider || {}), _b = _a.providedIn, providedIn = _b === void 0 ? ROOT_SCOPE : _b, nonSingle = _a.nonSingle;
    var injectableDef = { token: type, nonSingle: nonSingle, providedIn: providedIn, factory: convertToFactory(type, provider) };
    nonSingle && (injectableDef.flags = InjectFlags.NonCache);
    return _setInjectableDef(type, injectableDef);
};
export var Injectable = makeDecorator('Injectable', undefined, function (injectableType, meta) {
    setInjectableDef(injectableType, meta);
});
var mergeInfo = function (token, options) {
    if (options === void 0) { options = {}; }
    return (__assign(__assign({}, options), { token: token }));
};
export var Inject = attachInjectFlag(makeParamDecorator('Inject', mergeInfo), -1 /* DecoratorFlags.Inject */);
export var Prop = attachInjectFlag(makePropDecorator('Prop', mergeInfo), -1 /* DecoratorPropFlags.Prop */);
