/**
 * Created by mcsim on 01.10.16.
 */
"use strict";

var DescriptorBase = require('../../baseDescriptor');

var path = "test:path:testDescriptor";

module.exports = class TestDescriptor extends DescriptorBase {

    static load(data, callback) {
       DescriptorBase.baseLoad(path, data, callback);
    }
    
    static insert(data, tags, callback) {
        DescriptorBase.baseInsert({
            path: path,
            data: data,
            tags: tags
        }, callback);
    }
};