/**
 * Created by mcsim on 01.10.16.
 */
"use strict";

var db = global.services.get('Db');

module.exports = class BaseDescriptor {
    static load(path, data) {
        return db.collection('descriptors').find({
            path: new RegExp(path)
        });
    }
};