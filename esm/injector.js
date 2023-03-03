import { getInjectableDef } from './def';
import { injectArgs, saveCurrentInjector } from './injector_compatibility';
import { INJECTOR, INJECTOR_SCOPE } from './injector-token';
import { covertToFactory } from './util';
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
    constructor(additionalProviders, parent) {
        this.parent = parent;
        this._destroyed = false;
        this.onDestroy = new Set();
        this.records = new Map();
        deepForEach(additionalProviders || [], (provider) => this.set(typeof provider === 'function' ? provider : provider.provide, provider));
        this.records.set(INJECTOR, makeRecord(() => this));
        const record = this.records.get(INJECTOR_SCOPE);
        this.scope = (record === null || record === void 0 ? void 0 : record.factory) ? record.factory() : null;
    }
    get destroyed() {
        return this._destroyed;
    }
    get(token) {
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
            return record !== null ? this.hydrate(token, record) : (_a = this.parent) === null || _a === void 0 ? void 0 : _a.get(token);
        }
        finally {
            saveCurrentInjector(reInjector);
        }
    }
    set(token, provider) {
        const record = makeRecord(covertToFactory(token, provider));
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
    destory() {
        this._destroyed = true;
        this.parent = void (0);
        !this._destroyed && this.onDestroy.forEach((service) => service.destory());
        this.onDestroy.clear();
        this.records.clear();
    }
    hydrate(token, record) {
        if (record.value === NOT_YES) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            record.value = record.factory();
        }
        if (typeof record.value === 'object' &&
            record.value.destory &&
            !(record.value instanceof StaticInjector)) {
            this.onDestroy.add(record.value);
        }
        return record.value;
    }
}
export function createInjector(providers, parent) {
    return new StaticInjector(providers, parent);
}
