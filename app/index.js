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

MeanGenerator.prototype.grunt = function grunt() {
  this.copy('_gruntfile.js', 'gruntfile.js');
};

MeanGenerator.prototype.bower = function bower() {
  this.copy('_bower.json', 'bower.json');
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
  this.copy('_package.json', 'package.json');
};

MeanGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/controllers');
  this.mkdir('app/models');
  this.mkdir('app/views');
  this.mkdir('app/views/includes');
  this.mkdir('app/views/layouts');

  this.copy('app/controllers/index.js', 'app/controllers/index.js');

  this.copy('app/views/includes/foot.jade', 'app/views/includes/foot.jade');
  this.copy('app/views/includes/head.jade', 'app/views/includes/head.jade');

  this.copy('app/views/layouts/default.jade', 'app/views/layouts/default.jade');

  this.copy('app/views/404.jade', 'app/views/404.jade');
  this.copy('app/views/500.jade', 'app/views/500.jade');
  this.copy('app/views/index.jade', 'app/views/index.jade');
};

MeanGenerator.prototype.configSetup = function configSetup() {
  this.mkdir('config');
  this.mkdir('config/env');
  this.mkdir('config/middlewares');

  this.copy('config/env/all.js', 'config/env/all.js');
  this.copy('config/env/development.json', 'config/env/development.json');
  this.copy('config/env/production.json', 'config/env/production.json');
  this.copy('config/env/test.json', 'config/env/test.json');
  this.copy('config/env/travis.json', 'config/env/travis.json');

  this.copy('config/config.js', 'config/config.js');
  this.copy('config/express.js', 'config/express.js');
  this.copy('config/routes.js', 'config/routes.js');
};

MeanGenerator.prototype.publicSetup = function publicSetup() {

  this.mkdir('public');
  this.mkdir('public/js');
  this.mkdir('public/js/controllers');
  this.mkdir('public/js/services');
  this.mkdir('public/views');
};

MeanGenerator.prototype.angularSetup = function angularSetup() {

  this.copy('public/js/controllers/index.js', 'public/js/controllers/index.js');
  this.copy('public/js/app.js', 'public/js/app.js');
  this.copy('public/js/config.js', 'public/js/config.js');
  this.copy('public/js/directives.js', 'public/js/directives.js');
  this.copy('public/js/filters.js', 'public/js/filters.js');
  this.copy('public/js/init.js', 'public/js/init.js');
};

MeanGenerator.prototype.templateSetup = function templateSetup() {

  this.copy('public/views/index.html', 'public/views/index.html');

  this.copy('public/humans.txt', 'public/humans.txt');
  this.copy('public/robots.txt', 'public/robots.txt');
};

MeanGenerator.prototype.serverSetup = function serverSetup() {
  this.copy('_server.js', 'server.js');
};

