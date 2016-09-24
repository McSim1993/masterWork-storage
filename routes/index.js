/**
 * Created by McSim on 20.08.2016.
 */
var express = require('express');
var router = express.Router();

router.route('/')
    .get(function (req, res, next) {
        res.end('test')
    })
    .post(function (req, res, next) {
        res.end('test post')
    });

module.exports = router;