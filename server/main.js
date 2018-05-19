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
const mysql = require('mysql');
//var db = require('./db/');

const httpport = process.env.PORT || 8080;

// use pooling
var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nz_moca'
});

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
app.use(require('express').static(path.join("D:\\tool\\10w\\")));

app.get('/getPersonTimes', function (req, res) {
    console.log('[request]: /getPersonTimes');
    res.set('Content-Type', 'application/json');
    console.log(JSON.stringify(req.query));

    var sqlStr = 'select CamID,count(*) as count from ht_result where ';

    if (req.query.hasOwnProperty('camID') && ('' != req.query.camID)) {
        sqlStr = sqlStr + 'CamID =' + "'" + req.query.camID + "'" + ' and ';
    }
    if (req.query.hasOwnProperty('sex') && ('' != req.query.sex)) {
        sqlStr = sqlStr + 'Sex =' + "'" + req.query.sex + "'" + ' and ';
    }
    if (req.query.hasOwnProperty('startAge') && ('' != req.query.startAge)) {
        sqlStr = sqlStr + 'Age >=' + "'" + req.query.startAge + "'" + ' and ';
    }
    if (req.query.hasOwnProperty('endAge') && ('' != req.query.endAge)) {
        sqlStr = sqlStr + 'Age <' + "'" + req.query.endAge + "'" + ' and ';
    }
    if (req.query.hasOwnProperty('startTime') && ('' != req.query.startTime)) {
        sqlStr = sqlStr + 'time >= ' + "'" + req.query.startTime + "'" + ' and ';
    }
    if (req.query.hasOwnProperty('endTime') && ('' != req.query.endTime)) {
        sqlStr = sqlStr + 'time <= ' + "'" + req.query.endTime + "'" + ' and ';
    }

    var hasFilter = false;
    for (key in req.query) {
        if ('' != req.query[key]) {
            sqlStr = sqlStr.slice(0, -4); //remove and
            hasFilter = true;
            break;
        }
    }
    if (!hasFilter) {
        sqlStr = sqlStr.slice(0, -6);  //remove where
    }

    sqlStr = sqlStr + 'group by CamID'

    console.log(sqlStr);

    var p1 = new Promise(function (resolve, reject) {
        pool.query('select CamID from ht_result group by CamID', function (error, results, fields) {
            if (error) {
                reject(error);
            }
            if (results) {
                var array1 = new Array();
                for (var i = 0; i < results.length; i++) {
                    array1.push(results[i].CamID);
                }
                resolve(array1);
            }
        });

    });

    var p2 = new Promise(function (resolve, reject) {
        pool.query(sqlStr, function (error, results, fields) {
            if (error) {
                reject(error);
            }
            if (results) {
                var array2 = new Array();
                for (var i = 0; i < results.length; i++) {

                    var doc = {};
                    doc.camID = results[i].CamID;
                    doc.count = results[i].count;
                    array2.push(doc);

                }
                resolve(array2);
            }

        });
    });


    // 同时执行p1和p2，并在它们都完成后执行then:
    Promise.all([p1, p2]).then(function (results) {
        console.log(results); // 获得一个Array: ['P1', 'P2']
        var res_obj = {};
        res_obj.code = 0;
        res_obj.msg = '';
        var data = {};

        var list = [];
        for (var i = 0; i < results[0].length; i++) {
            var doc = {};
            doc.camID = results[0][i];
            var isZero = true;
            var count = 0;
            for (var j = 0; j < results[1].length; j++) {
                console.log('results[0][i] = ' + results[0][i]);
                console.log('results[1][j] = ' + results[1][j]);
                console.log('results[1][j].CamID = ' + results[1][j].camID);
                if (results[0][i] === results[1][j].camID) {
                    isZero = false;
                    count = results[1][j].count;
                    break;
                }
            }

            if (isZero) {
                doc.count = 0;
            } else {
                doc.count = count;
            }

            list.push(doc);
        }
        data.list = list;
        res_obj.data = data;
        res.send(res_obj);

    }).catch(function (error) {
        var res_obj = {};
        res_obj.code = -1;
        res_obj.msg = '数据库查询失败!'
        res_obj.data = {};
        res.send(res_obj);
    });

    //db.disconnect(connection);
});

app.get('/getDetailData', function (req, res) {
    console.log('[request]: /getDetailData');
    res.set('Content-Type', 'application/json');
    console.log(JSON.stringify(req.query));

    var sqlStr = 'select CamID,Pic,Sex,Age,time,TopID,TopName from ht_result where ';
    var sqlStr_count = 'select count(*) as count from ht_result where '

    var sqlStrFilter = '';
    if (req.query.hasOwnProperty('camID') && ('' != req.query.camID)) {
        sqlStrFilter = sqlStrFilter + 'CamID =' + "'" + req.query.camID + "'" + ' and ';
    }
    if (req.query.hasOwnProperty('sex') && ('' != req.query.sex)) {
        sqlStrFilter = sqlStrFilter + 'Sex =' + "'" + req.query.sex + "'" + ' and ';
    }
    if (req.query.hasOwnProperty('startAge') && ('' != req.query.startAge)) {
        sqlStrFilter = sqlStrFilter + 'Age >=' + "'" + req.query.startAge + "'" + ' and ';
    }
    if (req.query.hasOwnProperty('endAge') && ('' != req.query.endAge)) {
        sqlStrFilter = sqlStrFilter + 'Age <' + "'" + req.query.endAge + "'" + ' and ';
    }
    if (req.query.hasOwnProperty('startTime') && ('' != req.query.startTime)) {
        sqlStrFilter = sqlStrFilter + 'time >= ' + "'" + req.query.startTime + "'" + ' and ';
    }
    if (req.query.hasOwnProperty('endTime') && ('' != req.query.endTime)) {
        sqlStrFilter = sqlStrFilter + 'time <= ' + "'" + req.query.endTime + "'" + ' and ';
    }

    var hasFilter = false;
    for (key in req.query) {
        if ('' != req.query[key]) {
            sqlStrFilter = sqlStrFilter.slice(0, -4); //remove and
            hasFilter = true;
            break;
        }
    }
   
    if (!hasFilter) {
        //sqlStrFilter = sqlStrFilter.slice(0, -6);  //remove where
        sqlStr = sqlStr.slice(0, -6);
        sqlStr_count = sqlStr_count.slice(0, -6);
    }

    //limit 
    var sqlStrLimit = '';
    if (req.query.hasOwnProperty('limitStartPos') && ('' != req.query.limitStartPos)) {
        if (req.query.hasOwnProperty('limitNumber') && ('' != req.query.limitNumber)) {
            sqlStrLimit = sqlStrLimit + ' limit ' + req.query.limitStartPos + ' , ' + req.query.limitNumber;
        } else {
            sqlStrLimit = sqlStrLimit + ' limit ' + req.query.limitStartPos + ' , ' + '10';
        }
    }

    sqlStr = sqlStr + sqlStrFilter + sqlStrLimit;
    sqlStr_count = sqlStr_count + sqlStrFilter;

    console.log(sqlStr);
    console.log(sqlStr_count);

    var p1 = new Promise(function (resolve, reject) {
        pool.query(sqlStr_count, function (error, results, fields) {
            var totalCount = 0;
            if (error) {
                reject(error);
            }
            if (results) {
                totalCount = results[0].count;
                resolve(totalCount);
            }

        });
    });

    p1.then(function (value) {
        pool.query(sqlStr, function (error, results, fields) {
            var res_obj = {};

            if (error) {
                reject(error);
            }
            if (results) {
                res_obj.code = 0;
                res_obj.msg = '';
                var data = {};

                var list = [];
                for (var i = 0; i < results.length; i++) {

                    var doc = {};
                    doc.camID = results[i].CamID;
                    doc.pic = results[i].Pic;
                    doc.sex = results[i].Sex;
                    doc.age = results[i].Age;
                    doc.topID = results[i].TopID;
                    doc.topName = results[i].TopName;
                    doc.time = moment(results[i].time).format("YYYY-MM-DD HH:mm:ss");
                    list.push(doc);
                }
                data.list = list;
                data.totalCount = value;
                res_obj.data = data;

                res.send(res_obj);
            }
        });
    }).catch(function (error) {
        var res_obj = {};
        res_obj.code = -1;
        res_obj.msg = '数据库查询失败!'
        res_obj.data = {};
        res.send(res_obj);
    });
});

app.get('/getCameraList', function (req, res) {
    console.log('[request]: /getCameraList');
    res.set('Content-Type', 'application/json');

    var sqlStr = 'select CamID from ht_result group by CamID';

    //var connection = db.createConnection('test');
    pool.query(sqlStr, function (error, results, fields) {
        var res_obj = {};
        if (error) {
            res_obj.code = -1;
            res_obj.msg = '数据库查询失败!'
            res_obj.data = {};
            res.send(res_obj);
            throw error;
        }
        if (results) {
            res_obj.code = 0;
            res_obj.msg = '';
            var data = {};
            var list = [];

            for (var i = 0; i < results.length; i++) {
                list.push(results[i].CamID);
            }
            data.list = list;
            res_obj.data = data;
            res.send(res_obj);
        }
    });
});

httpServer.listen(httpport, function () {
    console.log('listening on ' + ip.address() + ":" + httpport);
});


