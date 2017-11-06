/**
 * Created by andreashammer on 02/05/16.
 */
var express = require('express');
var router = express.Router();
var pool = require('../MySQL').connection;

router.get('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var myDate = new Date();
        var sql = "SELECT * FROM VisitorCount WHERE Date LIKE '" + myDate.getFullYear() + "-" + ((myDate.getMonth() + 1) < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1)) + "-" + myDate.getDate() + "'";
        connection.query(sql, function (err, rows) {
            if (err) {
                connection.release();
                console.log(err);
                res.render('error', {message: "Error", error: err});
            }
            else {
                if (rows != null) {
                    if (rows.length > 0) {
                        sql = "UPDATE VisitorCount SET Visitors=Visitors+1 WHERE Date LIKE '" + myDate.getFullYear() + "-" + ((myDate.getMonth() + 1) < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1)) + "-" + myDate.getDate() + "'";
                        connection.query(sql, function (err, rows) {
                            connection.release();
                            if (err) {
                                console.log(err);
                                res.render('error', {message: 'Error', error: err});
                            }
                            else {
                                res.send('Success in updating the visitor');
                            }
                        });
                    }
                    else {
                        sql = "INSERT INTO `VisitorCount`(`Date`, `Visitors`) VALUES ('" + myDate.getFullYear() + "-" + ((myDate.getMonth() + 1) < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1)) + "-" + myDate.getDate() + "', '1');";
                        connection.query(sql, function (err, rows) {
                            connection.release();
                            if (err) {
                                console.log(err);
                                res.render('error', {message: 'Error', error: err});
                            }
                            else {
                                res.send('Success in pdating the visitors');
                            }
                        });
                    }
                }
            }

        });
    });
});

module.exports = router;