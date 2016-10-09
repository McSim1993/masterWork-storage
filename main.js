/**
 * Created by McSim on 24.09.2016.
 */
var appRunner = require('./modules/appRunner');
var conf = require('./config');
var logger = require('winston');

var servicesLoader = require('./modules/services');
servicesLoader.load()
    .then(function (serviceContainer) {
        global.services = serviceContainer;

        var app = require('./app');

        appRunner.run(app, conf.port);
    })
    .catch(function (err) {
        logger.error("Services load error", err);
    });

