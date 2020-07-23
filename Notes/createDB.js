var mysql = require('mysql');

var con =  mysql.createConnection({
    host: 'localhost',
    user: 'alper',
    password: '654321',
    database: 'fbw10test'
});

con.connect(function(err){
    if(err) throw err;

    var sql = 'CREATE TABLE testtable (name VARCHAR(255), address VARCHAR(255))';

    con.query(sql, function(err, result){
        if (err) throw err;
        console.log("table created");
    });
});