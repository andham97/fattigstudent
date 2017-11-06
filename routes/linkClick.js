/**
 * Created by andreashammer on 02/05/16.
 */
var express = require('express');
var router = express.Router();
var pool = require('../MySQL').connection;

router.get('/', function (req, res, next) {
    if (req.query.url == "" || req.query.url == null) {
        res.send('Error in url');
        return;
    }
    pool.getConnection(function (err, connection) {
        var sql = "UPDATE PPK SET Popularity=Popularity+1 WHERE Vareurl LIKE '" + req.query.url + "'";
        connection.query(sql, function (err, rows) {
            connection.release();
            if (err) {
                console.log(err);
                res.render('error', {message: "Error", error: err});
            }
            else {
                res.send('Success in updating the popularity');
            }

        });
    });
});

module.exports = router;