/**
 * Created by mcsim on 24.09.16.
 */
"use strict";

var logger = require('winston');

class Storage {
    learn(descriptors, tags) {
        console.log('learn');
        console.log(descriptors);
        console.log(tags);
    }

    getTags(descriptors) {
        logger.debug('getTags');
        logger.debug(descriptors);

        return Promise.all(descriptors.map((current, index, array) => {
            return this.loadTagsForSingleDescriptor(current);
        })).then((tags) => {
            return this.postProcess(tags);
        });
    }

    loadTagsForSingleDescriptor(descriptor) {
        return new Promise((resolve, reject) => {
            var descriptorClass =  this.resolvePath(descriptor.path);
            if (!descriptorClass) {
                return resolve([]);
            }
            descriptorClass.load(descriptor.data, function (err, savedDescriptors) {
                if (err) return reject(err);
                resolve(savedDescriptors.map(function (current, index, array) {
                    return current.tags;
                }));
            });
        });
    }

    postProcess(tags) {
        return tags;
    }

    resolvePath(path) {
        var classPath = path.replace(/:/g, '/');
        try {
            var impl = require('../descriptors/' + classPath);
            return impl;
        } catch (err) {
            logger.warn('Could not load descriptor class for "' + path + '". Error: ' + err.message);
            return null;
        }
    }
}

module.exports = new Promise(function (resolve, reject) {
    resolve(new Storage());
});