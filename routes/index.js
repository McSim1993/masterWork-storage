/**
 * Created by McSim on 20.08.2016.
 */
var express = require('express');
var router = express.Router();
var statuses = require('http-status');

var storage = global.services.get('Storage');

router.route('/')
    .get(function (req, res, next) {
        storage.getTags(req.descriptors);
    })
    .post(function (req, res, next) {
        if (!req.body.descriptors || !req.body.tags) {
            var err = new Error("Descriptors and tags required in body");
            err.status = statuses.BAD_REQUEST;
            return next(err);
        }

        storage.learn(req.body.descriptors, req.body.tags, function (err) {
            if (err) return next(err);
            res.end();
        });
    });

module.exports = router;