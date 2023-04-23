import { createInjector } from './injector';
import { ɵɵInject } from './injector_compatibility';
import { INJECTOR } from './injector-token';
var Injector = /** @class */ (function () {
    function Injector() {
    }
    Injector.__prov_def__ = { token: Injector, providedIn: 'any', factory: function () { return ɵɵInject(INJECTOR); } };
    Injector.create = function (providers, parent) { return createInjector(providers, parent); };
    return Injector;
}());
export { Injector };
