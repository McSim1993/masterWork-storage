/**
 * Created by McSim on 09.10.2016.
 */
"use strict";

var request = require('request');
var expect = require('chai').expect;
var fs = require('fs');
var conf = require('../config');

var baseUrl = 'http://' + conf.host + ':' + conf.port;

describe('life cycle', () => {
    before((done) => {
        require('../services/mongoDb').then((db) => {
            db.init((err) => {
                expect(err).to.not.be.ok;
                require('../main');
                done();
            });
        });
    });

    it('returns empty set of tags', (done) => {
        fs.createReadStream('./tests/data/testDescriptor.json').pipe(request.post(baseUrl + '/tags'))
            .on('response', (response) => {
            expect(response.statusCode).to.be.equal(200);
            var data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () =>{
                var resp = JSON.parse(data);
                expect(resp).to.be.a('Object');
                expect(Object.keys(resp)).to.be.empty;
                done();
            });
        });
    });
    
    it('posts a descriptor to server', (done) => {
        fs.createReadStream('./tests/data/singleDescriptorLearnData.json').pipe(request.post(baseUrl + '/learn'))
            .on('response', (response) => {
            expect(response.statusCode).to.be.equal(200);
            var data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                var resp = JSON.parse(data);
                expect(resp).to.be.a('Array');
                expect(resp).to.have.lengthOf(1);
                expect(resp[0].added).to.be.a('String');
                done();
            });
        });
    });

    it('posts a descriptor copy to server', (done) => {
        fs.createReadStream('./tests/data/singleDescriptorLearnData.json').pipe(request.post(baseUrl + '/learn'))
            .on('response', (response) => {
            expect(response.statusCode).to.be.equal(200);
            var data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                var resp = JSON.parse(data);
                expect(resp).to.be.a('Array');
                expect(resp).to.have.lengthOf(1);
                expect(resp[0].updated).to.be.a('Array');
                expect(resp[0].updated).to.have.lengthOf(1);
                expect(resp[0].updated[0]).to.be.a('String');
                done();
            });
        });
    });

    it('returns set of 2 tags', (done) => {
        fs.createReadStream('./tests/data/testDescriptor.json').pipe(request.post(baseUrl + '/tags'))
            .on('response', (response) => {
                expect(response.statusCode).to.be.equal(200);
                var data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                });
                response.on('end', () =>{
                    var resp = JSON.parse(data);
                    expect(resp).to.be.a('Object');
                    expect(Object.keys(resp)).to.have.lengthOf(2);
                    expect(resp.tag1).to.be.ok;
                    done();
                });
            });
    });

    it('returns emty set, with unexisting descriptor', (done) => {
        fs.createReadStream('./tests/data/unexistingDescriptor.json').pipe(request.post(baseUrl + '/tags'))
            .on('response', (response) => {
            expect(response.statusCode).to.be.equal(200);
            var data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                var resp = JSON.parse(data);
                expect(resp).to.be.a('Object');
                expect(Object.keys(resp)).to.be.empty;
                done();
            });
        });
    });

});