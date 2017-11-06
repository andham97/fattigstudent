/**
 * Created by andreashammer on 02/05/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('cpanel', {});
});

module.exports = router;