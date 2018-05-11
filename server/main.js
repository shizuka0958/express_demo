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
var cors = require('cors')

var db = require('./db/');

const httpport = process.env.PORT || 8080;

// method 1：
// var allowCrossDomain = function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');//自定义中间件，设置跨域需要的响应头。
//     next();
//    };

// app.use(allowCrossDomain);//运用跨域的中间件

// method 2:
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Credentials", true)
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Headers", "X-Requested-With")
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8")
//     next()
// })

// method 3: use cors
app.use(cors())
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

            for (var i = 0; i < results.length; i++) {

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


httpServer.listen(httpport, function () {
    console.log('listening on ' + ip.address() + ":" + httpport);
});

/*
    db
*/
db.init();


