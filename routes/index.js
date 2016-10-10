/**
 * Created by McSim on 20.08.2016.
 */
var express = require('express');
var router = express.Router();
var statuses = require('http-status');

var storage = global.services.get('Storage');

router.route('/tags')
    .post(function (req, res, next) {
        if (!req.body.descriptors) {
            var err = new Error("Descriptors are required in body");
            err.status = statuses.BAD_REQUEST;
            return next(err);
        }

        storage.getTags(req.body.descriptors)
            .then(function (tags) {
                res.send(tags);
                res.end();
            }, next);
    });

router.route('/learn')
    .post(function (req, res, next) {
        if (!req.body.descriptors || !req.body.tags) {
            var err = new Error("Descriptors and tags are required in body");
            err.status = statuses.BAD_REQUEST;
            return next(err);
        }

        storage.learn(req.body.descriptors, req.body.tags)
            .then((result) => {
                res.send(result);
                res.end();
            }, next);
    });

module.exports = router;