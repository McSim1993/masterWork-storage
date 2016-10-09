/**
 * Created by mcsim on 01.10.16.
 */
"use strict";

var db = global.services.get('Db');

module.exports = class BaseDescriptor {

    static baseLoad(path, data, callback) {
        db.descriptors.find({
            path: new RegExp(path)
        }).toArray(callback);
    }
};