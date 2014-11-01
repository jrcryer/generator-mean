'use strict';

var _ = require('underscore'),
   fs = require('fs');

// Load configurations
// Set the node environment variable if not set before
process.env.NODE_ENV = ~fs.readdirSync('./config/env').map(function(file) {
    if (file === 'all.js') {
    	return file.slice(0, -3);		
	}
	// case json file
	return file.slice(0, -5);
}).indexOf(process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

// Extend the base configuration in all.js with environment
// specific configuration
module.exports = _.extend(
    require('./env/all'),
    require('./env/' + process.env.NODE_ENV) || {}
);