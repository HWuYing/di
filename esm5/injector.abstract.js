import { createInjector } from './injector';
import { ɵɵinject } from './injector_compatibility';
import { INJECTOR } from './injector-token';
var Injector = /** @class */ (function () {
    function Injector() {
    }
    Injector.__prov_def__ = { token: Injector, providedIn: 'any', factory: function () { return ɵɵinject(INJECTOR); } };
    Injector.create = function (providers, parent) { return createInjector(providers, parent); };
    return Injector;
}());
export { Injector };
