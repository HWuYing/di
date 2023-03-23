import { getInjectableDef } from './def';
import { injectArgs, saveCurrentInjector } from './injector_compatibility';
import { INJECTOR, INJECTOR_SCOPE } from './injector-token';
import { convertToFactory } from './util';
export var InjectFlags;
(function (InjectFlags) {
    InjectFlags[InjectFlags["Default"] = 0] = "Default";
    InjectFlags[InjectFlags["Self"] = 2] = "Self";
})(InjectFlags || (InjectFlags = {}));
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
var StaticInjector = /** @class */ (function () {
    function StaticInjector(additionalProviders, parent) {
        var _this = this;
        this.parent = parent;
        this._destroyed = false;
        this.onDestroy = new Set();
        this.records = new Map();
        deepForEach(additionalProviders || [], function (provider) { return _this.set(typeof provider === 'function' ? provider : provider.provide, provider); });
        this.records.set(INJECTOR, makeRecord(function () { return _this; }));
        this.scope = this.get(INJECTOR_SCOPE, InjectFlags.Self);
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
        var reInjector = saveCurrentInjector(this);
        try {
            if (this.destroyed) {
                return null;
            }
            var record = this.records.get(token);
            if (!record) {
                var def = getInjectableDef(token);
                record = def && checkInjectableScope(this.scope, def) ? makeRecord(def.factory) : null;
                this.records.set(token, record || null);
            }
            return record !== null ? this.hydrate(token, record) : flags & InjectFlags.Self ? null : (_a = this.parent) === null || _a === void 0 ? void 0 : _a.get(token);
        }
        finally {
            saveCurrentInjector(reInjector);
        }
    };
    StaticInjector.prototype.set = function (token, provider) {
        var record = makeRecord(convertToFactory(token, provider));
        if (provider.multi) {
            var multiRecord_1 = this.records.get(token);
            if (!multiRecord_1) {
                multiRecord_1 = makeRecord(function () { return injectArgs(multiRecord_1.multi); }, NOT_YES, true);
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
    StaticInjector.prototype.hydrate = function (token, record) {
        if (record.value === NOT_YES) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            record.value = record.factory();
        }
        if (typeof record.value === 'object' &&
            record.value.destroy &&
            !(record.value instanceof StaticInjector)) {
            this.onDestroy.add(record.value);
        }
        return record.value;
    };
    return StaticInjector;
}());
export { StaticInjector };
export function createInjector(providers, parent) {
    return new StaticInjector(providers, parent);
}
