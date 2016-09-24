/**
 * Created by McSim on 24.09.2016.
 */
var appRunner = require('./modules/appRunner');

var app = require('./app');
var conf = require('./config');



appRunner.run(app, conf.port);