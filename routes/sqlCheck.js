/**
 * Created by andreashammer on 02/05/16.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var request = require('request');
var pool = require('../MySQL').connection;

router.get('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var sql = "SELECT Vareurl, Varenummer FROM PPK WHERE Link LIKE '0' LIMIT 500";
        connection.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            var urls = [];
            for (var i = 0; i < rows.length; i++) {
                urls.push([rows[i].Vareurl, rows[i].Varenummer]);
            }
            console.log(urls);
            async.map(urls, function (url, callback) {
                request(url[0], function (error, response, body) {
                    if (!error && Number(response.statusCode) < 300) {
                        console.log("success");
                        connection.query("UPDATE PPK SET Link='1' WHERE Vareurl LIKE '" + url[0] + "'", function (err, rows) {
                            if(err)
                                console.log(err);
                            connection.query("INSERT INTO Whitelist (varenr, url) VALUES ('" + url[1] + "', '" + url[0] + "')", function(err){
                                if(err)
                                    console.error(err);
                            });
                        });
                    }
                    else {
                        console.log(url[0]);
                        connection.query("UPDATE PPK SET Link='2' WHERE Vareurl LIKE '" + url[0] + "'", function (err, rows) {
                            if (err)
                                console.log(err);
                        });
                    }
                });
            });
            res.render('sqlCheck', {});
        });
    });
});

module.exports = router;