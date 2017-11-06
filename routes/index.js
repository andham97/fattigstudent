var express = require('express');
var router = express.Router();
var pool = require('../MySQL').connection;

/* GET home page. */
router.get('/', function (req, res, next) {
    var i, sql, val;
    pool.getConnection(function (err, connection) {
        //connection.query("SELECT * FROM Shops", function (err, shops) {
            /*var dsts = [];
            for(var i = 0; i < shops.length; i++){
                dsts.push({id: i, dst: geolib.getDistance({latitude: shops[i].GPS_breddegrad, longitude: shops[i].GPS_lendgegrad}, {latitude: req.query.lat, longitude: req.query.long}, 1, 1)});
            }
            dsts.sort(function(a, b){
                return a.dst - b.dst;
            });
            console.log(shops[dsts[0].id].Butikknavn);*/
            if (err) {
                console.log(err);
                return;
            }
            if (req.query.roulette != null) {
                i = 0;
                sql = "SELECT Varenavn, Varetype, Alkohol, Pris, Volum, PPK, Vareurl, Varenummer FROM PPK";
                val = {sql: sql, i: i};
                if (req.query.beer != null) {
                    val = addSQLSearch(val, 'Øl', req);
                }
                if (req.query.redwine != null) {
                    val = addSQLSearch(val, 'Rødvin', req);
                }
                if (req.query.whitewine != null) {
                    val = addSQLSearch(val, 'Hvitvin', req);
                }
                if (req.query.rosewine != null) {
                    val = addSQLSearch(val, 'Rosévin', req);
                }
                if (req.query.sparklingwine != null) {
                    val = addSQLSearch(val, 'Musserende vin', req);
                    val = addSQLSearch(val, 'Musserende fruktvin', req);
                }
                if (req.query.fruitwine != null) {
                    val = addSQLSearch(val, 'Fruktvin', req);
                }
                if (req.query.vodka != null) {
                    val = addSQLSearch(val, 'Vodka', req);
                }
                if (req.query.whiskey != null) {
                    val = addSQLSearch(val, 'Whisky', req);
                }
                if (req.query.druebrennevin != null) {
                    val = addSQLSearch(val, 'Druebrennevin', req);
                }
                if (req.query.liqueur != null) {
                    val = addSQLSearch(val, 'Likør', req);
                }
                if (req.query.akevitt != null) {
                    val = addSQLSearch(val, 'Akevitt', req);
                }
                if (req.query.fruktbrennevin != null) {
                    val = addSQLSearch(val, 'Fruktbrennevin', req);
                }
                if (req.query.rom != null) {
                    val = addSQLSearch(val, 'Rom', req);
                }
                if (req.query.bitter != null) {
                    val = addSQLSearch(val, 'Bitter', req);
                }
                if (req.query.gin != null) {
                    val = addSQLSearch(val, 'Gin', req);
                }
                if (req.query.genever != null) {
                    val = addSQLSearch(val, 'Genever', req);
                }
                if (req.query.lannet != null) {
                    val = addSQLSearch(val, 'Øvrig brennevin', req);
                }
                if (req.query.liqueuru != null) {
                    val = addSQLSearch(val, 'Likør under 22%', req);
                }
                if (req.query.bitteru != null) {
                    val = addSQLSearch(val, 'Bitter under 22%', req);
                }
                if (req.query.lannetu != null) {
                    val = addSQLSearch(val, 'Øvrig Brennevin under 22%', req);
                }
                if (req.query.portvin != null) {
                    val = addSQLSearch(val, 'Portvin', req);
                }
                if (req.query.sherry != null) {
                    val = addSQLSearch(val, 'Sherry', req);
                }
                if (req.query.vermut != null) {
                    val = addSQLSearch(val, 'Vermut', req);
                }
                if (req.query.madeira != null) {
                    val = addSQLSearch(val, 'Madeira', req);
                }
                if (req.query.sannet != null) {
                    val = addSQLSearch(val, 'Aromatisert sterkvin', req);
                    val = addSQLSearch(val, 'Øvrig sterkvin', req);
                }
                if (req.query.alcoholfree != null) {
                    val = addSQLSearch(val, 'Alkoholfritt', req);
                }
                if (val.i == 0) {
                    val.sql += " WHERE Varenavn LIKE '%" + req.query.search + "%'";
                    if (req.query.vmin != null && req.query.vmax != null && req.query.vmin != "" && req.query.vmax != "") {
                        val.sql += " AND Volum BETWEEN '" + req.query.vmin + "' AND '" + req.query.vmax + "'";
                    }
                    if (req.query.vmin != null && req.query.vmax != null && req.query.vmin != "" && req.query.vmax == "") {
                        val.sql += " AND Volum BETWEEN '" + req.query.vmin + "' AND '100000'";
                    }
                    if (req.query.vmin != null && req.query.vmax != null && req.query.vmin == "" && req.query.vmax != "") {
                        val.sql += " AND Volum BETWEEN '0' AND '" + req.query.vmax + "'";
                    }
                    if (req.query.pmin != null && req.query.pmax != null && req.query.pmin != "" && req.query.pmax != "") {
                        val.sql += " AND Pris BETWEEN '" + req.query.pmin + "' AND '" + req.query.pmax + "'";
                    }
                    if (req.query.pmin != null && req.query.pmax != null && req.query.pmin == "" && req.query.pmax != "") {
                        val.sql += " AND Pris BETWEEN '0' AND '" + req.query.pmax + "'";
                    }
                    if (req.query.pmin != null && req.query.pmax != null && req.query.pmin != "" && req.query.pmax == "") {
                        val.sql += " AND Pris BETWEEN '" + req.query.pmin + "' AND '10000000'";
                    }
                    if (req.query.birthLimit != null) {
                        val.sql += " AND Alkohol < '22'";
                    }
                }
                val.sql += " ORDER BY RAND() LIMIT 1";
                connection.query(val.sql, function (err, rows) {
                    connection.release();
                    if (!err) {
                        if (rows.length == 0)
                            res.render('index', {title: 'Express', result: "0 results", page: "Side " + (page + 1)});
                        else {
                            var s = "<table id='results'><th onclick='sort(this)'>Produktnavn</th><th onclick='sort(this)'>Type</th><th onclick='sort(this)'>Alkohol</th><th onclick='sort(this)'>Pris</th><th onclick='sort(this)'>Volum</th><th onclick='sort(this)'data-tooltip='Prosent per krone' data-tooltip-animate-function='spin'>PPK</th>";
                            for (var i = 0; i < rows.length; i++) {
                                connection.query("UPDATE PPK SET Popularity=Popularity+1 WHERE Vareurl LIKE '" + rows[i].Vareurl + "'", function (err) {
                                    if (err)
                                        console.log(err);
                                    else
                                        console.log("Success");
                                });
                                s += "<tr bgColor='" + (i % 2 == 0 ? "#f2f2f2" : "#ffffff") + "'><td><a target='_blank' href='" + rows[i].Vareurl + "'>" + rows[i].Varenavn + "</a></td><td>" + rows[i].Varetype + "</td><td>" + rows[i].Alkohol + "%</td><td>" + rows[i].Pris + "kr</td><td>" + rows[i].Volum + "L</td><td>" + rows[i].PPK + "</td></tr>";
                            }
                            s += "</table>";
                            res.render('index', {
                                title: "Express",
                                result: s,
                                page: "",
                                nextPageStart: "<!--",
                                nextPageEnd: "-->"
                            });
                        }
                    }
                    else {
                        res.render('error', {message: "Error", error: err});
                        console.log("Didn't find anything");
                    }
                });
                return;
            }
            if (req.query.search == undefined) {
                connection.query("SELECT Varenavn, Varetype, Alkohol, Pris, Volum, PPK, Vareurl, Varenummer FROM PPK LIMIT 10", function (err, rows) {
                    connection.release();
                    if (!err) {
                        if (rows.length == 0)
                            res.render('index', {title: 'Express', result: "0 results", page: "Side 1"});
                        else {
                            var s = "<table id='results'><th onclick='sort(this)'>Produktnavn</th><th onclick='sort(this)'>Type</th><th onclick='sort(this)'>Alkohol</th><th onclick='sort(this)'>Pris</th><th onclick='sort(this)'>Volum</th><th onclick='sort(this)' data-tooltip='Prosent per krone' data-tooltip-animate-function='spin'>PPK</th>";
                            for (var i = 0; i < rows.length; i++) {
                                s += "<tr bgColor='" + (i % 2 == 0 ? "#f2f2f2" : "#ffffff") + "''><td><a target='_blank' href='" + rows[i].Vareurl + "'>" + rows[i].Varenavn + "</a></td><td>" + rows[i].Varetype + "</td><td>" + rows[i].Alkohol + "%</td><td>" + rows[i].Pris + "kr</td><td>" + rows[i].Volum + "L</td><td>" + rows[i].PPK + "</td></tr>";
                            }
                            s += "</table>";
                            res.render('index', {
                                title: "Express",
                                result: s,
                                page: "Side 1",
                                nextPageStart: "",
                                nextPageEnd: ""
                            });
                        }
                    }
                    else {
                        res.render('error', {message: "Error", error: err});
                        console.log("Didn't find anything");
                    }
                });
                return;
            }
            if (err) {
                connection.release();
                res.json({"code": 100, "status": "Error in connection to database"});
                return;
            }
            i = 0;
            sql = "SELECT Varenavn, Varetype, Alkohol, Pris, Volum, PPK, Vareurl, Varenummer FROM PPK";
            val = {sql: sql, i: i};
            if (req.query.beer != null) {
                val = addSQLSearch(val, 'Øl', req);
            }
            if (req.query.redwine != null) {
                val = addSQLSearch(val, 'Rødvin', req);
            }
            if (req.query.whitewine != null) {
                val = addSQLSearch(val, 'Hvitvin', req);
            }
            if (req.query.rosewine != null) {
                val = addSQLSearch(val, 'Rosévin', req);
            }
            if (req.query.sparklingwine != null) {
                val = addSQLSearch(val, 'Musserende vin', req);
                val = addSQLSearch(val, 'Musserende fruktvin', req);
            }
            if (req.query.fruitwine != null) {
                val = addSQLSearch(val, 'Fruktvin', req);
            }
            if (req.query.vodka != null) {
                val = addSQLSearch(val, 'Vodka', req);
            }
            if (req.query.whiskey != null) {
                val = addSQLSearch(val, 'Whisky', req);
            }
            if (req.query.druebrennevin != null) {
                val = addSQLSearch(val, 'Druebrennevin', req);
            }
            if (req.query.liqueur != null) {
                val = addSQLSearch(val, 'Likør', req);
            }
            if (req.query.akevitt != null) {
                val = addSQLSearch(val, 'Akevitt', req);
            }
            if (req.query.fruktbrennevin != null) {
                val = addSQLSearch(val, 'Fruktbrennevin', req);
            }
            if (req.query.rom != null) {
                val = addSQLSearch(val, 'Rom', req);
            }
            if (req.query.bitter != null) {
                val = addSQLSearch(val, 'Bitter', req);
            }
            if (req.query.gin != null) {
                val = addSQLSearch(val, 'Gin', req);
            }
            if (req.query.genever != null) {
                val = addSQLSearch(val, 'Genever', req);
            }
            if (req.query.lannet != null) {
                val = addSQLSearch(val, 'Øvrig brennevin', req);
            }
            if (req.query.liqueuru != null) {
                val = addSQLSearch(val, 'Likør under 22%', req);
            }
            if (req.query.bitteru != null) {
                val = addSQLSearch(val, 'Bitter under 22%', req);
            }
            if (req.query.lannetu != null) {
                val = addSQLSearch(val, 'Øvrig Brennevin under 22%', req);
            }
            if (req.query.portvin != null) {
                val = addSQLSearch(val, 'Portvin', req);
            }
            if (req.query.sherry != null) {
                val = addSQLSearch(val, 'Sherry', req);
            }
            if (req.query.vermut != null) {
                val = addSQLSearch(val, 'Vermut', req);
            }
            if (req.query.madeira != null) {
                val = addSQLSearch(val, 'Madeira', req);
            }
            if (req.query.sannet != null) {
                val = addSQLSearch(val, 'Aromatisert sterkvin', req);
                val = addSQLSearch(val, 'Øvrig sterkvin', req);
            }
            if (req.query.alcoholfree != null) {
                val = addSQLSearch(val, 'Alkoholfritt', req);
            }
            if (val.i == 0) {
                val.sql += " WHERE Varenavn LIKE '%" + req.query.search + "%'";
                if (req.query.vmin != null && req.query.vmax != null && req.query.vmin != "" && req.query.vmax != "") {
                    val.sql += " AND Volum BETWEEN '" + req.query.vmin + "' AND '" + req.query.vmax + "'";
                }
                if (req.query.vmin != null && req.query.vmax != null && req.query.vmin != "" && req.query.vmax == "") {
                    val.sql += " AND Volum BETWEEN '" + req.query.vmin + "' AND '100000'";
                }
                if (req.query.vmin != null && req.query.vmax != null && req.query.vmin == "" && req.query.vmax != "") {
                    val.sql += " AND Volum BETWEEN '0' AND '" + req.query.vmax + "'";
                }
                if (req.query.pmin != null && req.query.pmax != null && req.query.pmin != "" && req.query.pmax != "") {
                    val.sql += " AND Pris BETWEEN '" + req.query.pmin + "' AND '" + req.query.pmax + "'";
                }
                if (req.query.pmin != null && req.query.pmax != null && req.query.pmin == "" && req.query.pmax != "") {
                    val.sql += " AND Pris BETWEEN '0' AND '" + req.query.pmax + "'";
                }
                if (req.query.pmin != null && req.query.pmax != null && req.query.pmin != "" && req.query.pmax == "") {
                    val.sql += " AND Pris BETWEEN '" + req.query.pmin + "' AND '10000000'";
                }
                if (req.query.birthLimit != null) {
                    val.sql += " AND Alkohol < '22'";
                }
                val.sql += " OR Varenummer LIKE '" + req.query.search + "'";
                if (req.query.vmin != null && req.query.vmax != null && req.query.vmin != "" && req.query.vmax != "") {
                    val.sql += " AND Volum BETWEEN '" + req.query.vmin + "' AND '" + req.query.vmax + "'";
                }
                if (req.query.vmin != null && req.query.vmax != null && req.query.vmin != "" && req.query.vmax == "") {
                    val.sql += " AND Volum BETWEEN '" + req.query.vmin + "' AND '100000'";
                }
                if (req.query.vmin != null && req.query.vmax != null && req.query.vmin == "" && req.query.vmax != "") {
                    val.sql += " AND Volum BETWEEN '0' AND '" + req.query.vmax + "'";
                }
                if (req.query.pmin != null && req.query.pmax != null && req.query.pmin != "" && req.query.pmax != "") {
                    val.sql += " AND Pris BETWEEN '" + req.query.pmin + "' AND '" + req.query.pmax + "'";
                }
                if (req.query.pmin != null && req.query.pmax != null && req.query.pmin == "" && req.query.pmax != "") {
                    val.sql += " AND Pris BETWEEN '0' AND '" + req.query.pmax + "'";
                }
                if (req.query.pmin != null && req.query.pmax != null && req.query.pmin != "" && req.query.pmax == "") {
                    val.sql += " AND Pris BETWEEN '" + req.query.pmin + "' AND '10000000'";
                }
                if (req.query.birthLimit != null) {
                    val.sql += " AND Alkohol < '22'";
                }
            }
            if (req.query.orderBy == "")
                req.query.orderBy = "PPK";
            val.sql += " ORDER BY " + req.query.orderBy + " " + (req.query.ASC == "on" ? "ASC" : "DESC");
            var page = Number(req.query.pageNum);
            page--;
            val.sql += " LIMIT " + page * 10 + ", 10";
            console.log(val.sql);
            connection.query("SELECT COUNT(*) AS rowCount FROM PPK WHERE" + (val.sql.split("WHERE")[1]).split("LIMIT")[0], function (err, rows) {
                var rowCount = rows[0].rowCount;
                console.log(rowCount);
                connection.query(val.sql, function (err, rows) {
                    connection.release();
                    if (!err) {
                        if (rows.length == 0)
                            res.render('index', {
                                title: 'Express',
                                result: "0 results",
                                page: "Side " + (page + 1),
                                nextPageStart: "<!--",
                                nextPageEnd: "-->"
                            });
                        else {
                            var s = "<table id='results'><th onclick='sort(this)'>Produktnavn</th><th onclick='sort(this)'>Type</th><th onclick='sort(this)'>Alkohol</th><th onclick='sort(this)'>Pris</th><th onclick='sort(this)'>Volum</th><th onclick='sort(this)' data-tooltip='Prosent per krone' data-tooltip-animate-function='spin'>PPK</th>";
                            for (var i = 0; i < rows.length; i++) {
                                connection.query("UPDATE PPK SET Popularity=Popularity+1 WHERE Vareurl LIKE '" + rows[i].Vareurl + "'", function (err) {
                                    if (err)
                                        console.log(err);
                                    else
                                        console.log("Success");
                                });
                                s += "<tr bgColor='" + (i % 2 != 0 ? "#f2f2f2" : "#ffffff") + "'><td><a target='_blank' href='" + rows[i].Vareurl + "'>" + rows[i].Varenavn + "</a></td><td>" + rows[i].Varetype + "</td><td>" + rows[i].Alkohol + "%</td><td>" + rows[i].Pris + "kr</td><td>" + rows[i].Volum + "L</td><td>" + rows[i].PPK + "</td></tr>";
                            }
                            s += "</table>";
                            if (rowCount / 10 <= page + 1)
                                res.render('index', {
                                    title: "Express",
                                    result: s,
                                    page: "Side " + (page + 1),
                                    nextPageStart: "<!--",
                                    nextPageEnd: "-->"
                                });
                            else
                                res.render('index', {
                                    title: "Express",
                                    result: s,
                                    page: "Side " + (page + 1),
                                    nextPageStart: "",
                                    nextPageEnd: ""
                                });
                        }
                    }
                    else {
                        res.render('error', {message: "Error", error: err});
                        console.log("Didn't find anything");
                    }
                });
            });
        });
    //});
});

function addSQLSearch(val, vt, req) {
    for (var ii = 0; ii < 2; ii++) {
        if (val.i == 0) {
            val.sql += " WHERE";
            val.sql += " Varetype LIKE '" + vt + "'";
        }
        else {
            val.sql += " OR Varetype LIKE '" + vt + "'";
        }
        val.sql += " AND " + (ii == 0 ? "Varenavn" : "Varenummer") + " LIKE '%" + req.query.search + "%'";
        if (req.query.vmin != null && req.query.vmax != null && req.query.vmin != "" && req.query.vmax != "") {
            val.sql += " AND Volum BETWEEN '" + req.query.vmin + "' AND '" + req.query.vmax + "'";
        }
        if (req.query.vmin != null && req.query.vmax != null && req.query.vmin != "" && req.query.vmax == "") {
            val.sql += " AND Volum BETWEEN '" + req.query.vmin + "' AND '100000'";
        }
        if (req.query.vmin != null && req.query.vmax != null && req.query.vmin == "" && req.query.vmax != "") {
            val.sql += " AND Volum BETWEEN '0' AND '" + req.query.vmax + "'";
        }
        if (req.query.pmin != null && req.query.pmax != null && req.query.pmin != "" && req.query.pmax != "") {
            val.sql += " AND Pris BETWEEN '" + req.query.pmin + "' AND '" + req.query.pmax + "'";
        }
        if (req.query.pmin != null && req.query.pmax != null && req.query.pmin == "" && req.query.pmax != "") {
            val.sql += " AND Pris BETWEEN '0' AND '" + req.query.pmax + "'";
        }
        if (req.query.pmin != null && req.query.pmax != null && req.query.pmin != "" && req.query.pmax == "") {
            val.sql += " AND Pris BETWEEN '" + req.query.pmin + "' AND '10000000'";
        }
        if (req.query.birthLimit != null) {
            val.sql += " AND Alkohol < '22'";
        }
        val.i++;
    }
    return val;
}

module.exports = router;