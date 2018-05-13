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


app.get('/getPersonTimes', function (req, res) {
    res.set('Content-Type', 'application/json');
    console.log(JSON.stringify(req.query));

    var sqlStr = 'select CamID,count(*) as count from face where ';

    if (req.query.hasOwnProperty('camID')) {
        sqlStr = sqlStr + 'CamID =' + "'" + req.query.camID + "'" + ' and ';
    }
    if (req.query.hasOwnProperty('sex')) {
        sqlStr = sqlStr + 'Sex =' + "'" + req.query.sex + "'" + ' and ';
    }
    if (req.query.hasOwnProperty('startAge')) {
        sqlStr = sqlStr + 'Age >' + req.query.startAge + ' and ';
    }
    if (req.query.hasOwnProperty('endAge')) {
        sqlStr = sqlStr + 'Age <' + req.query.endAge + ' and ';
    }
    if (req.query.hasOwnProperty('startTime')) {
        sqlStr = sqlStr + 'time >= ' + "'" + req.query.startTime + "'" + ' and ';
    }
    if (req.query.hasOwnProperty('endTime')) {
        sqlStr = sqlStr + 'time <= ' + "'" + req.query.endTime + "'" + ' and ';
    }

    console.log(sqlStr);
    
    if('{}' != JSON.stringify(req.query)){
        sqlStr = sqlStr.slice(0,-4);
        console.log(sqlStr);
    }
    
    sqlStr = sqlStr + 'group by CamID'

    console.log(sqlStr);

    var res_arry = new Array();

    var connection = db.createConnection('test');
    connection.query(sqlStr, function (error, results, fields) {
        if (error) {
            throw error;
        }
        if (results) {

            for (var i = 0; i < results.length; i++) {

                var doc = {};
                doc.camID = results[i].CamID;
                doc.count = results[i].count;
                res_arry.push(doc);

            }
        }
        res.send(res_arry);
    });
    db.disconnect(connection);
});

app.get('/getDetailData', function (req, res) {
    res.set('Content-Type', 'application/json');
    console.log(JSON.stringify(req.query));

    var sqlStr = 'select CamID,Pic,Sex,Age,time from face where ';

    if (req.query.hasOwnProperty('camID')) {
        sqlStr = sqlStr + 'CamID =' + "'" + req.query.camID + "'" + ' and ';
    }
    if (req.query.hasOwnProperty('sex')) {
        sqlStr = sqlStr + 'Sex =' + "'" + req.query.sex + "'" + ' and ';
    }
    if (req.query.hasOwnProperty('startAge')) {
        sqlStr = sqlStr + 'Age >' + req.query.startAge + ' and ';
    }
    if (req.query.hasOwnProperty('endAge')) {
        sqlStr = sqlStr + 'Age <' + req.query.endAge + ' and ';
    }
    if (req.query.hasOwnProperty('startTime')) {
        sqlStr = sqlStr + 'time >= ' + "'" + req.query.startTime + "'" + ' and ';
    }
    if (req.query.hasOwnProperty('endTime')) {
        sqlStr = sqlStr + 'time <= ' + "'" + req.query.endTime + "'" + ' and ';
    }

    console.log(sqlStr);
    if('{}' != JSON.stringify(req.query)){
        sqlStr = sqlStr.slice(0,-4);
        console.log(sqlStr);
    }
    
    var res_arry = new Array();

    var connection = db.createConnection('test');
    connection.query(sqlStr, function (error, results, fields) {
        if (error) {
            throw error;
        }
        if (results) {
            for (var i = 0; i < results.length; i++) {

                var doc = {};
                doc.camID = results[i].CamID;
                doc.pic = results[i].Pic;
                doc.sex = results[i].Sex;
                doc.age = results[i].Age;
                doc.time = moment(results[i].time).format("YYYY-MM-DD HH:mm:ss");
                res_arry.push(doc);
            }
        }
        res.send(res_arry);
    });
    db.disconnect(connection);
});

app.get('/getCameraList', function (req, res) {
    res.set('Content-Type', 'application/json');
   
    var sqlStr = 'select CamID from face group by CamID';

    var res_arry = new Array();

    var connection = db.createConnection('test');
    connection.query(sqlStr, function (error, results, fields) {
        if (error) {
            throw error;
        }
        if (results) {

            for (var i = 0; i < results.length; i++) { 
                res_arry.push(results[i].CamID);
            }
        }
        res.send(res_arry);
    });
    db.disconnect(connection);
});

httpServer.listen(httpport, function () {
    console.log('listening on ' + ip.address() + ":" + httpport);
});


