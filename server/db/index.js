//
//  Copyright (C) 2016-2018  dvTrend, Inc - All Rights Reserved
//
//  author: Wendong
//


const init          = require('./db').init;
const unInit        = require('./db').unInit;
const getConnection = require('./db').getConnection;

exports.init   = init;
exports.unInit = unInit;
exports.getConnection  = getConnection;

