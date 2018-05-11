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
   

    var sqlStr = 'select camera_id,count(*) as count from face where ';

    if(req.query.hasOwnProperty('cameraID')){
        
    }else{
        if(req.query.hasOwnProperty('gender')){
            sqlStr = sqlStr+ 'gender ='+ "'"+ req.query.gender+ "'"+' ';
        }
        if(req.query.hasOwnProperty('startAge')){
            sqlStr = sqlStr+ 'and age >'+ req.query.startAge+' ';
        }
        if(req.query.hasOwnProperty('endAge')){
            sqlStr = sqlStr+ 'and age <'+ req.query.endAge+' ';
        }
        if(req.query.hasOwnProperty('startTime')){
            sqlStr = sqlStr+ 'and entry_time >= '+ "'"+req.query.startTime+"'"+' ';
        }
        if(req.query.hasOwnProperty('endTime')){
            sqlStr = sqlStr+ 'and entry_time <= '+ "'"+req.query.endTime+"'"+' ';
        }
        sqlStr = sqlStr +'group by camera_id'
        
    }
    console.log(sqlStr);
    
    var res_arry = new Array();

    db.getConnection().query(sqlStr, function (error, results, fields) {
        if (error) {
            throw error;
        }
        if (results) {

            for (var i = 0; i < results.length; i++) {

                var doc = {};
                //doc.time = moment(results[i].entry_time).format("YYYY-MM-DD HH:mm:ss");
                doc.cameraID = results[i].camera_id;
                doc.count = results[i].count;
                res_arry.push(doc);
              
            }
        }
        res.send(res_arry);
    });
});


httpServer.listen(httpport, function () {
    console.log('listening on ' + ip.address() + ":" + httpport);
});

/*
    db
*/
db.init();


