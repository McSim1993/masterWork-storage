/**
 * Created by McSim on 24.09.2016.
 */
"use strict";

module.exports = class ServiceContainer {
    constructor() {
        this.services = {};
    }

    register(name, service) {
        this.services[name] = service;
    }

    get(name) {
        return this.services[name];
    }
};