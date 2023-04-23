import { createInjector } from './injector';
import { ɵɵInject } from './injector_compatibility';
import { INJECTOR } from './injector-token';
export class Injector {
}
Injector.__prov_def__ = { token: Injector, providedIn: 'any', factory: () => ɵɵInject(INJECTOR) };
Injector.create = (providers, parent) => createInjector(providers, parent);
