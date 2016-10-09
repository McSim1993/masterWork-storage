/**
 * Created by mcsim on 01.10.16.
 */
"use strict";

var DescriptorBase = require('../../baseDescriptor');

module.exports = class TestDescriptor extends DescriptorBase {
   static load(path, data) {
       return DescriptorBase.load(path.data);
   }
};