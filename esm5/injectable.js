import { __assign } from "tslib";
import { makeDecorator, makeParamDecorator, makePropDecorator } from './decorators';
import { setInjectableDef as _setInjectableDef } from './def';
import { attachInjectFlag } from './injector_compatibility';
import { convertToFactory } from './util';
export var ROOT_SCOPE = 'root';
export var setInjectableDef = function (type, provider) {
    var _a = (provider || {}).providedIn, providedIn = _a === void 0 ? ROOT_SCOPE : _a;
    return _setInjectableDef(type, { token: type, providedIn: providedIn, factory: convertToFactory(type, provider) });
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
