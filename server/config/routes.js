/**
 * Dependencies.
 */
var requireDirectory = require('require-directory');

module.exports = function (server) {
  // Bootstrap your controllers so you dont have to load them individually. This loads them all into the controller name space. https://github.com/troygoode/node-require-directory
  var controller = requireDirectory(module, '../controllers');

  // Array of routes for Hapi
  var routeTable = [{
    method: 'GET',
    path: '/',
    config: controller.static.index
    }, {
    method: 'GET',
    path: '/img',
    config: controller.base.img
    }, {
    method: 'GET',
    path: '/partials/{path*}',
    config: controller.assets.partials
    }, {
    method: 'GET',
    path: '/images/{path*}',
    config: controller.assets.images
    }, {
    method: 'GET',
    path: '/css/{path*}',
    config: controller.assets.css
    }, {
    method: 'GET',
    path: '/js/{path*}',
    config: controller.assets.js
    }];
  return routeTable;
};