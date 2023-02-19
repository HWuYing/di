"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injector = void 0;
var injector_1 = require("./injector");
var injector_compatibility_1 = require("./injector_compatibility");
var injector_token_1 = require("./injector-token");
var Injector = /** @class */ (function () {
    function Injector() {
    }
    Injector.__prov_def__ = { token: Injector, providedIn: 'any', factory: function () { return (0, injector_compatibility_1.ɵɵinject)(injector_token_1.INJECTOR); } };
    Injector.create = function (providers, parent) { return (0, injector_1.createInjector)(providers, parent); };
    return Injector;
}());
exports.Injector = Injector;
