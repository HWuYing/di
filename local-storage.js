"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocatorStorage = void 0;
const tslib_1 = require("tslib");
const injectable_1 = require("./injectable");
const injector_abstract_1 = require("./injector.abstract");
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
LocatorStorage = tslib_1.__decorate([
    (0, injectable_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [injector_abstract_1.Injector])
], LocatorStorage);
exports.LocatorStorage = LocatorStorage;
