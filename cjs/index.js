"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToFactory = exports.reflectCapabilities = exports.InjectorToken = exports.INJECTOR_SCOPE = exports.forwardRef = exports.Injector = exports.InjectFlags = exports.setInjectableDef = exports.ROOT_SCOPE = exports.Injectable = exports.Inject = exports.INJECTOR_PROV_DEF = exports.getInjectableDef = exports.makePropDecorator = exports.makeParamDecorator = exports.makeMethodDecorator = exports.makeDecorator = void 0;
var decorators_1 = require("./decorators");
Object.defineProperty(exports, "makeDecorator", { enumerable: true, get: function () { return decorators_1.makeDecorator; } });
Object.defineProperty(exports, "makeMethodDecorator", { enumerable: true, get: function () { return decorators_1.makeMethodDecorator; } });
Object.defineProperty(exports, "makeParamDecorator", { enumerable: true, get: function () { return decorators_1.makeParamDecorator; } });
Object.defineProperty(exports, "makePropDecorator", { enumerable: true, get: function () { return decorators_1.makePropDecorator; } });
var def_1 = require("./def");
Object.defineProperty(exports, "getInjectableDef", { enumerable: true, get: function () { return def_1.getInjectableDef; } });
Object.defineProperty(exports, "INJECTOR_PROV_DEF", { enumerable: true, get: function () { return def_1.INJECTOR_PROV_DEF; } });
var injectable_1 = require("./injectable");
Object.defineProperty(exports, "Inject", { enumerable: true, get: function () { return injectable_1.Inject; } });
Object.defineProperty(exports, "Injectable", { enumerable: true, get: function () { return injectable_1.Injectable; } });
Object.defineProperty(exports, "ROOT_SCOPE", { enumerable: true, get: function () { return injectable_1.ROOT_SCOPE; } });
Object.defineProperty(exports, "setInjectableDef", { enumerable: true, get: function () { return injectable_1.setInjectableDef; } });
var injector_1 = require("./injector");
Object.defineProperty(exports, "InjectFlags", { enumerable: true, get: function () { return injector_1.InjectFlags; } });
var injector_abstract_1 = require("./injector.abstract");
Object.defineProperty(exports, "Injector", { enumerable: true, get: function () { return injector_abstract_1.Injector; } });
var injector_compatibility_1 = require("./injector_compatibility");
Object.defineProperty(exports, "forwardRef", { enumerable: true, get: function () { return injector_compatibility_1.forwardRef; } });
var injector_token_1 = require("./injector-token");
Object.defineProperty(exports, "INJECTOR_SCOPE", { enumerable: true, get: function () { return injector_token_1.INJECTOR_SCOPE; } });
Object.defineProperty(exports, "InjectorToken", { enumerable: true, get: function () { return injector_token_1.InjectorToken; } });
var reflection_capabilities_1 = require("./reflection-capabilities");
Object.defineProperty(exports, "reflectCapabilities", { enumerable: true, get: function () { return reflection_capabilities_1.reflectCapabilities; } });
var util_1 = require("./util");
Object.defineProperty(exports, "convertToFactory", { enumerable: true, get: function () { return util_1.convertToFactory; } });
