/**
 * Module dependencies.
 */
var express        = require('express'),
    consolidate    = require('consolidate'),
    session        = require('express-session'),
    helpers        = require('view-helpers'),
    morgan         = require('morgan'),
    cookieParser   = require('cookie-parser'),
    serveStatic    = require('serve-static'),
    bodyParser     = require('body-parser'),
    compression    = require('compression'),
    methodOverride = require('method-override'),
    favicon        = require('static-favicon'),
    MongoStore     = require('connect-mongo')({session: session}),
    flash          = require('connect-flash'),
    config         = require('./config');

module.exports = function(app, db) {
    app.set('showStackError', true);

    // Prettify HTML
    app.locals.pretty = true;

    // cache=memory or swig dies in NODE_ENV=production
	app.locals.cache = 'memory';

    //Should be placed before express
    app.use(compression({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    //Don't use logger for test env
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    // assign the template engine to .html files
    app.engine('html', consolidate[config.templateEngine]);

    // set .html as the default extension
    app.set('view engine', config.templateEngine);

    // Set views path, template engine and default layout
    app.set('views', config.root + '/app/views');

    // Enable jsonp
    app.enable('jsonp callback');

    // The cookieParser should be above session
    app.use(cookieParser());

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Express/Mongo session storage
    app.use(session({
        secret: config.sessionSecret,
        store: new MongoStore({
            db: db.connection.db,
            collection: config.sessionCollection
        })
    }));

    // Dynamic helpers
    app.use(helpers(config.app.name));

    // Connect flash for flash messages
    app.use(flash());

    // Setting the fav icon and static folder
    app.use(favicon(config.root + '/public/favicon.ico'));
    app.use(serveStatic(config.root + '/public'));
    app.use('/lib', serveStatic(config.root + '/app/components'));

    // Assume "not found" in the error msgs is a 404. this is somewhat
    // silly, but valid, you can do whatever you like, set properties,
    // use instanceof etc.
    app.use(function(err, req, res, next) {
        // Treat as 404
        if (~err.message.indexOf('not found')) return next();

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });
};
