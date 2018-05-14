/**
 * @license
 * Copyright (C) 2016-2018  dvTrend, Inc - All Rights Reserved
 * 
 * @file DB operation.
 * @author zm
 *
*/
const mysqlClient = require('mysql');

function createConnection(dbName) {
    //创建一个connection
    var connection = mysqlClient.createConnection({

        host: 'localhost',       //主机
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
    return connection;
}


function disconnect(connection) {
    if (connection) {
        console.log('[connection disconnect]  succeed!');
        connection.end();
    }
}

exports.createConnection = createConnection;
exports.disconnect = disconnect;


