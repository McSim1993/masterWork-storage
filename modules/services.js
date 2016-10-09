/**
 * Created by mcsim on 24.09.16.
 */
"use strict";

var ServiceContainer = require('./serviceContainer');
var container = new ServiceContainer();

function load() {
    return require('../services/storage')
        .then(function (storage) {
            container.register('Storage', storage);
            return require('../services/mongoDb');
        })
        .then(function (db) {
            container.register('Db', db);
            return container;
        })
        .catch(function (err) {
           throw err;
        });
}

module.exports = {
    load: load
};