'use strict';

var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    db: process.env.MONGOHQ_URL,

    // Template Engine
    templateEngine: 'jade',

    // The secret should be set to a non-guessable string that
  	// is used to compute a session hash
  	sessionSecret: 'MEAN',
  	// The name of the MongoDB collection to store sessions in
  	sessionCollection: 'sessions'
}
