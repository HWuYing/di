import { __decorate, __metadata } from "tslib";
import { Injectable } from "./injectable";
import { Injector } from "./injector.abstract";
let LocatorStorage = class LocatorStorage {
    injector;
    constructor(injector) {
        this.injector = injector;
    }
    getProvider(token, ...params) {
        return this.injector.get(token, ...params);
    }
    getService(target) {
        return this.injector.get(target);
    }
};
LocatorStorage = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Injector])
], LocatorStorage);
export { LocatorStorage };
