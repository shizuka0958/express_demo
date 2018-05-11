/**
 * @license
 * Copyright (C) 2016-2018  dvTrend, Inc - All Rights Reserved
 * 
 * @file DB operation.
 * @author zm
 *
*/


const mysqlClient = require('mysql');
const dbName = 'test';

var connection = null;


function init() {
    //创建一个connection
    connection = mysqlClient.createConnection({

        host: '127.0.0.1',       //主机
        user: 'root',            //MySQL认证用户名
        password: 'nzai123!@#',
        port: '3306',
        database: dbName

    });

    connection.connect(function (err) {

        if (err) {

            console.log('[query] - :' + err);

            return;

        }
        console.log('[connection connect]  succeed!');

    });
}

function getConnection() {
    console.log(connection);
    return connection;
}

function unInit() {
    if(connection)
    connection.end();
}

exports.init   = init;
exports.unInit = unInit;
exports.getConnection  = getConnection;

