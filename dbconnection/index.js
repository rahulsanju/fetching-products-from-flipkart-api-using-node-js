var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'flipkartapi'
});
connection.connect();

connection.query("drop table if exists productsfeedlisting");



connection.query('drop table  if exists productsFeed');



module.exports = connection;
