'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var MeanGenerator = module.exports = function MeanGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};
util.inherits(MeanGenerator, yeoman.generators.Base);

MeanGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  console.log(this.yeoman);
  console.log('Out of the box I include Mongoose, Express, AngularJS and Node.');

  var prompts = [{
    name: 'appName',
    message: 'Your application name please?'
  },{
    name: 'authorName',
    message: 'Your name please?'
  },{
    name: 'authorGithub',
    message: 'Your Github username please?'
  },{
    name: 'appDescription',
    message: 'Your application description please?'
  },{
    type: 'checkbox',
    name: 'features',
    message: 'What more would you like?',
    choices: [{
      name: 'Twitter Bootstrap for Sass',
      value: 'compassBootstrap',
      checked: true
    }]
  }];

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    function hasFeature(feat) { return features !== undefined && features.indexOf(feat) !== -1; }

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.compassBootstrap = hasFeature('compassBootstrap');
    this.appName = answers.appName;
    this.authorName = answers.authorName;
    this.authorGithub = answers.authorGithub;
    this.appDescription = answers.appDescription;
    cb();
  }.bind(this));
};

MeanGenerator.prototype.grunt = function grunt() {
  this.copy('_gruntfile.js', 'gruntfile.js');
};

MeanGenerator.prototype.bower = function bower() {
  this.template('_bower.json', 'bower.json');
  this.copy('bowerrc', '.bowerrc');
};

MeanGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

MeanGenerator.prototype.travis = function travis() {
  this.copy('travis.yml', '.travis.yml');
};

MeanGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

MeanGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
};

MeanGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

MeanGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/controllers');
  this.mkdir('app/models');
  this.mkdir('app/views');
  this.mkdir('app/views/includes');
  this.mkdir('app/views/layouts');

  this.copy('app/controllers/index.js');

  this.copy('app/views/includes/foot.jade');
  this.copy('app/views/includes/head.jade');

  this.copy('app/views/layouts/default.jade');

  this.copy('app/views/404.jade');
  this.copy('app/views/500.jade');
  this.copy('app/views/index.jade');

  this.mkdir('public/styles');

  if (this.compassBootstrap) {
    this.copy('app/styles/app.scss');
  } else {
    this.copy('public/styles/app.css');
  }
};

MeanGenerator.prototype.configSetup = function configSetup() {
  this.mkdir('config');
  this.mkdir('config/env');
  this.mkdir('config/middlewares');

  this.copy('config/env/all.js');
  this.template('config/env/development.json');
  this.template('config/env/production.json');
  this.template('config/env/test.json');
  this.template('config/env/travis.json');

  this.copy('config/config.js');
  this.copy('config/express.js');
  this.copy('config/routes.js');
};

MeanGenerator.prototype.publicSetup = function publicSetup() {

  this.mkdir('public');
  this.mkdir('public/js');
  this.mkdir('public/js/controllers');
  this.mkdir('public/js/services');
  this.mkdir('public/views');
};

MeanGenerator.prototype.angularSetup = function angularSetup() {

  this.copy('public/js/controllers/index.js');
  this.copy('public/js/app.js');
  this.copy('public/js/config.js');
  this.copy('public/js/directives.js');
  this.copy('public/js/filters.js');
  this.copy('public/js/init.js');
};

MeanGenerator.prototype.templateSetup = function templateSetup() {

  this.copy('public/views/index.html');

  this.copy('public/humans.txt');
  this.copy('public/robots.txt');
};

MeanGenerator.prototype.serverSetup = function serverSetup() {
  this.copy('_server.js', 'server.js');
};

