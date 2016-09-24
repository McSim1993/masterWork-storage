/**
 * Created by McSim on 24.09.2016.
 */


class serviceContainer {
    var services = {};

    register(name, service) {
        this.services[name] = service;
    }

    get(name) {
        return this.services[name];
    }
}