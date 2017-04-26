/**
 * Created by mcsim on 01.10.16.
 */
"use strict";

var db = global.services.get('Db');

module.exports = class BaseDescriptor {

    static baseSave(descriptor, callback)  {
        if (!descriptor.path)
            return callback(new Error('"Path" must be present'));
        if (!descriptor.tags)
            descriptor.tags = {};
        db.descriptors.save(descriptor, callback);
    }

    static baseLoad(path, data, callback) {
        db.descriptors.find({
            path: new RegExp(path)
        }).toArray(callback);
    }

    static baseInsert(descriptor, callback) {
        db.descriptors.insert(descriptor, (err, result) => {
            if (err) return callback(err);

            callback(null, result.insertedIds[0]);
        });
    }
};