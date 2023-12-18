"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInjector = exports.StaticInjector = exports.deepProviders = exports.InjectFlags = void 0;
var def_1 = require("./def");
var injector_compatibility_1 = require("./injector_compatibility");
var injector_token_1 = require("./injector-token");
var util_1 = require("./util");
var InjectFlags;
(function (InjectFlags) {
    InjectFlags[InjectFlags["Default"] = 0] = "Default";
    InjectFlags[InjectFlags["Self"] = 2] = "Self";
    InjectFlags[InjectFlags["NonCache"] = 16] = "NonCache";
})(InjectFlags || (exports.InjectFlags = InjectFlags = {}));
var NOT_YES = {};
function makeRecord(factory, value, multi) {
    if (value === void 0) { value = NOT_YES; }
    if (multi === void 0) { multi = false; }
    return { factory: factory, value: value, multi: multi ? [] : undefined };
}
function checkInjectableScope(scope, def) {
    var providedIn = def.providedIn;
    return providedIn && (def.providedIn === scope || providedIn === 'any');
}
function deepForEach(input, fn) {
    input.forEach(function (value) { return Array.isArray(value) ? deepForEach(value, fn) : fn(value); });
}
function deepProviders(injector, providers) {
    deepForEach(providers || [], function (provider) { return injector.set(typeof provider === 'function' ? provider : provider.provide, provider); });
}
exports.deepProviders = deepProviders;
var StaticInjector = /** @class */ (function () {
    function StaticInjector(additionalProviders, parent) {
        var _this = this;
        this.parent = parent;
        this._destroyed = false;
        this.onDestroy = new Set();
        this.records = new Map();
        deepProviders(this, additionalProviders);
        this.records.set(injector_token_1.INJECTOR, makeRecord(function () { return _this; }));
        this.scope = this.get(injector_token_1.INJECTOR_SCOPE, InjectFlags.Self);
    }
    Object.defineProperty(StaticInjector.prototype, "destroyed", {
        get: function () {
            return this._destroyed;
        },
        enumerable: false,
        configurable: true
    });
    StaticInjector.prototype.get = function (token, flags) {
        var _a;
        if (flags === void 0) { flags = InjectFlags.Default; }
        var reInjector = (0, injector_compatibility_1.saveCurrentInjector)(this);
        try {
            if (this.destroyed) {
                return null;
            }
            var record = this.records.get(token) || null;
            if (!record) {
                var def = (0, def_1.getInjectableDef)(token);
                if (def && checkInjectableScope(this.scope, def)) {
                    record = makeRecord(def.factory);
                    record.flags = def.flags;
                }
                this.records.set(token, record);
            }
            return record !== null ? this.hydrate(record, flags) : flags & InjectFlags.Self ? record : (_a = this.parent) === null || _a === void 0 ? void 0 : _a.get(token, flags);
        }
        finally {
            (0, injector_compatibility_1.saveCurrentInjector)(reInjector);
        }
    };
    StaticInjector.prototype.set = function (token, provider) {
        var record = makeRecord((0, util_1.convertToFactory)(token, provider));
        if (provider.multi) {
            var multiRecord_1 = this.records.get(token);
            if (!multiRecord_1) {
                multiRecord_1 = makeRecord(function () { return (0, injector_compatibility_1.injectArgs)(multiRecord_1.multi); }, NOT_YES, true);
                this.records.set(token, multiRecord_1);
            }
            token = provider;
            multiRecord_1.multi.push(provider);
        }
        this.records.set(token, record);
    };
    StaticInjector.prototype.destroy = function () {
        var onDestroy = Array.from(this.onDestroy);
        this.onDestroy.clear();
        this.parent = void (0);
        onDestroy.forEach(function (service) { return service.destroy(); });
        this._destroyed = true;
        this.records.clear();
    };
    StaticInjector.prototype.hydrate = function (record, flags) {
        if (flags === void 0) { flags = InjectFlags.Default; }
        var value = record.value;
        var _flags = (record.flags || InjectFlags.Default) | flags;
        var isNoneCache = _flags & InjectFlags.NonCache;
        if (isNoneCache && value !== NOT_YES)
            console.error('数据进行缓存: ' + value);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (value === NOT_YES || isNoneCache)
            value = record.factory();
        if (!isNoneCache) {
            record.value = value;
            if ((value === null || value === void 0 ? void 0 : value.destroy) && !(value instanceof StaticInjector)) {
                this.onDestroy.add(value);
            }
        }
        return value;
    };
    return StaticInjector;
}());
exports.StaticInjector = StaticInjector;
function createInjector(providers, parent) {
    return new StaticInjector(providers, parent);
}
exports.createInjector = createInjector;
