//
//  Copyright (C) 2016-2018  dvTrend, Inc - All Rights Reserved
//
//  author: zm
//

var app = require('express')();
var httpServer = require('http').Server(app);
var path = require('path');
var ip = require('ip');
var moment = require('moment');

var db = require('./db/');

const httpport = process.env.PORT || 8080;


app.use(require('express').static(path.join(__dirname, 'public')));


app.get('/test', function (req, res) {
    res.set('Content-Type', 'application/json');
    console.log(JSON.stringify(req.query));

    var time_arry = new Array();

        db.getConnection().query("select * from face", function (error, results, fields) {
        if (error) {
            throw error;
        }
        if (results) {
           
            for (var i = 0; i < results.length; i++)     {
            
                var doc = {};
                doc.time = moment(results[i].entry_time).format("YYYY-MM-DD HH:mm:ss");
                console.log(doc.time);
                time_arry.push(doc);
                console.log(time_arry.length); 
            }
        }
        res.send(time_arry);
    });   
});


// app.get('*', function (req, res) {
//     res.set('Content-Type', 'application/json');
//     var ret = test_mysql();
//     res.send(ret);
// });

httpServer.listen(httpport, function () {
    console.log('listening on ' + ip.address() + ":" + httpport);
});

/*
    db
*/
db.init();


