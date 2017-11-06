var express = require('express');
var router = express.Router();
var pool = require('../MySQL').connection;

/* GET home page. */
router.get('/faq', function (req, res, next) {
    res.render('faq', {});
});

module.exports = router;