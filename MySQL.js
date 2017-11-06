/**
 * Created by andreashammer on 28/04/16.
 */
var mysql = require('mysql');
var connection = mysql.createPool({
    connectionLimit: 1000,
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "Fattigstudent"
});

module.exports = {
    connection: connection
};