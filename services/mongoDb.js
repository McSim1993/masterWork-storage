/**
 * Created by mcsim on 01.10.16.
 */
"use strict";

var DataBase = require('./db');
var config = require('../config');
var mongo = require('mongodb');

class MongoDb extends DataBase {
    connect(url, callback) {
        mongo.MongoClient.connect(url, (err, db) => {
            if (err) return callback(err);
            this.connection = db;
            callback(null);
        });
    }

    get descriptors() {
        this.connection.collection('descriptors');
    }
}

module.exports = new Promise(function (resolve, reject) {
    var db = new MongoDb();
    db.connect(config.database.url, function (err) {
        if (err) return reject(err);
        resolve(db);
    });
});