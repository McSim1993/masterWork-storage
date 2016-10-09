/**
 * Created by McSim on 09.10.2016.
 */
"use strict";

var request = require('request');
var expect = require('chai').expect;
var fs = require('fs');
var conf = require('../config');

var baseUrl = 'http://' + conf.host + ':' + conf.port;

describe('life cycle', function () {
    before(function () {
        require('../main');
    });

    it('simple get', function (done) {
        fs.createReadStream('./tests/data/testDescriptor.json').pipe(request.post(baseUrl + '/tags')).on('response', function (response){
            expect(response.statusCode).to.be.equal(200);
            var data = '';
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                console.log(data);
                done();
            });
        });
    })
});