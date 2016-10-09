/**
 * Created by mcsim on 24.09.16.
 */
"use strict";

class Storage {
    learn(descriptors, tags) {
        console.log('learn');
        console.log(descriptors);
        console.log(tags);
    }

    getTags(descriptor) {
        console.log('getTags');
        console.log(descriptor);

        var impl = this.resolvePath(descriptor.path);
    }

    resolvePath(path) {
        var classPath = path.replace(':', '/');
        
        var impl = require('../descriptors/' + classPath);
    }
}

module.exports = new Promise(function (resolve, reject) {
    resolve(new Storage());
});