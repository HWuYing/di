"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToFactory = exports.InjectorToken = exports.INJECTOR_SCOPE = exports.Injector = exports.ROOT_SCOPE = exports.Prop = exports.Injectable = exports.Inject = exports.setInjectableDef = exports.INJECTOR_PROV_DEF = exports.makePropDecorator = exports.makeParamDecorator = exports.makeMethodDecorator = exports.makeDecorator = void 0;
var decorators_1 = require("./decorators");
Object.defineProperty(exports, "makeDecorator", { enumerable: true, get: function () { return decorators_1.makeDecorator; } });
Object.defineProperty(exports, "makeMethodDecorator", { enumerable: true, get: function () { return decorators_1.makeMethodDecorator; } });
Object.defineProperty(exports, "makeParamDecorator", { enumerable: true, get: function () { return decorators_1.makeParamDecorator; } });
Object.defineProperty(exports, "makePropDecorator", { enumerable: true, get: function () { return decorators_1.makePropDecorator; } });
var def_1 = require("./def");
Object.defineProperty(exports, "INJECTOR_PROV_DEF", { enumerable: true, get: function () { return def_1.INJECTOR_PROV_DEF; } });
Object.defineProperty(exports, "setInjectableDef", { enumerable: true, get: function () { return def_1.setInjectableDef; } });
var injectable_1 = require("./injectable");
Object.defineProperty(exports, "Inject", { enumerable: true, get: function () { return injectable_1.Inject; } });
Object.defineProperty(exports, "Injectable", { enumerable: true, get: function () { return injectable_1.Injectable; } });
Object.defineProperty(exports, "Prop", { enumerable: true, get: function () { return injectable_1.Prop; } });
Object.defineProperty(exports, "ROOT_SCOPE", { enumerable: true, get: function () { return injectable_1.ROOT_SCOPE; } });
var injector_abstract_1 = require("./injector.abstract");
Object.defineProperty(exports, "Injector", { enumerable: true, get: function () { return injector_abstract_1.Injector; } });
var injector_token_1 = require("./injector-token");
Object.defineProperty(exports, "INJECTOR_SCOPE", { enumerable: true, get: function () { return injector_token_1.INJECTOR_SCOPE; } });
Object.defineProperty(exports, "InjectorToken", { enumerable: true, get: function () { return injector_token_1.InjectorToken; } });
var util_1 = require("./util");
Object.defineProperty(exports, "convertToFactory", { enumerable: true, get: function () { return util_1.convertToFactory; } });
