import { getInjectableDef } from './def';
import { injectArgs, saveCurrentInjector } from './injector_compatibility';
import { INJECTOR, INJECTOR_SCOPE } from './injector-token';
import { convertToFactory } from './util';
export var InjectFlags;
(function (InjectFlags) {
    InjectFlags[InjectFlags["Default"] = 0] = "Default";
    InjectFlags[InjectFlags["Self"] = 2] = "Self";
})(InjectFlags || (InjectFlags = {}));
const NOT_YES = {};
function makeRecord(factory, value = NOT_YES, multi = false) {
    return { factory, value, multi: multi ? [] : undefined };
}
function checkInjectableScope(scope, def) {
    const { providedIn } = def;
    return providedIn && (def.providedIn === scope || providedIn === 'any');
}
function deepForEach(input, fn) {
    input.forEach(value => Array.isArray(value) ? deepForEach(value, fn) : fn(value));
}
export class StaticInjector {
    get destroyed() {
        return this._destroyed;
    }
    constructor(additionalProviders, parent) {
        this.parent = parent;
        this._destroyed = false;
        this.onDestroy = new Set();
        this.records = new Map();
        deepForEach(additionalProviders || [], (provider) => this.set(typeof provider === 'function' ? provider : provider.provide, provider));
        this.records.set(INJECTOR, makeRecord(() => this));
        this.scope = this.get(INJECTOR_SCOPE, InjectFlags.Self);
    }
    get(token, flags = InjectFlags.Default) {
        var _a;
        const reInjector = saveCurrentInjector(this);
        try {
            if (this.destroyed) {
                return null;
            }
            let record = this.records.get(token);
            if (!record) {
                const def = getInjectableDef(token);
                record = def && checkInjectableScope(this.scope, def) ? makeRecord(def.factory) : null;
                this.records.set(token, record || null);
            }
            return record !== null ? this.hydrate(token, record) : flags & InjectFlags.Self ? null : (_a = this.parent) === null || _a === void 0 ? void 0 : _a.get(token);
        }
        finally {
            saveCurrentInjector(reInjector);
        }
    }
    set(token, provider) {
        const record = makeRecord(convertToFactory(token, provider));
        if (provider.multi) {
            let multiRecord = this.records.get(token);
            if (!multiRecord) {
                multiRecord = makeRecord(() => injectArgs(multiRecord.multi), NOT_YES, true);
                this.records.set(token, multiRecord);
            }
            token = provider;
            multiRecord.multi.push(provider);
        }
        this.records.set(token, record);
    }
    destroy() {
        const onDestroy = Array.from(this.onDestroy);
        this.onDestroy.clear();
        this.parent = void (0);
        onDestroy.forEach((service) => service.destroy());
        this._destroyed = true;
        this.records.clear();
    }
    hydrate(token, record) {
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
    }
}
export function createInjector(providers, parent) {
    return new StaticInjector(providers, parent);
}
