/**
 * Created by mcsim on 24.09.16.
 */
"use strict";

var logger = require('winston');
var config = require("../config.js");

class Storage {
    learn(descriptors, tags) {
        logger.debug('learn');
        logger.debug(descriptors);
        logger.debug(tags);

        return Promise.all(descriptors.map((current) => {
            return this.learnForSingleDescriptor(current, tags);
        })).then((result) => {
            return result;
        });
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
            descriptorClass.load(descriptor.data, (err, savedDescriptors) => {
                if (err) return reject(err);
                resolve(savedDescriptors.map(function (current, index, array) {
                    return current.tags;
                }));
            });
        });
    }

    learnForSingleDescriptor(descriptor, tags) {
        return new Promise((resolve, reject) => {
            var descriptorClass = this.resolvePath(descriptor.path);
            if (!descriptorClass) return reject(new Error('Could not find implementation class for ' + descriptor.path));

            descriptorClass.load(descriptor.data, (err, savedDescriptors) => {
                if (err) return reject(err);
                if (!savedDescriptors.length) {
                    this.initDescriptor(descriptorClass, descriptor, tags)
                        .then(resolve, reject);
                } else {
                    Promise.all(savedDescriptors.map((current) => {
                        return this.correctDescriptor(descriptorClass, current, tags);
                    })).then(resolve, reject);
                }
            });
        });
    }

    initDescriptor(descriptorClass, descriptor, tags) {
        return new Promise((resolve, reject) => {
            var weightedTags = tags.reduce((prev, tag) => {
                prev[tag] = config.storage.initialTagWeight;
                return prev;
            }, {});

            descriptorClass.insert(descriptor.data, weightedTags, (err, id) => {
                if (err) return reject(err);
                resolve({ added: id });
            });
        });
    }

    correctDescriptor(descriptorClass, descriptor, tags) {
        return new Promise((resolve, reject) => {
            tags.forEach((tag) => {
               if (!descriptor.tags[tag])
                   descriptor.tags[tag] = config.storage.initialTagWeight;
                else
                   descriptor.tags[tag] *= config.storage.tagMultiplier;
            });
            for (let tag in descriptor.tags)
                descriptor.tags[tag] -= config.storage.tagFadeFactor;
        });
    }

    postProcess(tags) {
        return this.reduceTagsArray(tags.map((curr) => { return this.reduceTagsArray(curr)}));
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

    reduceTagsArray(tags) {
        return tags.reduce((prev, current, index, array) => {
            for(var tag in current)
                if (current.hasOwnProperty(tag))
                    if (prev[tag])
                        prev[tag] += current[tag];
                    else
                        prev[tag] = current[tag];
            return prev;
        }, {});
    }
}

module.exports = new Promise(function (resolve, reject) {
    resolve(new Storage());
});