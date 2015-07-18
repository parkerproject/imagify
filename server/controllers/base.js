// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
require('dotenv').load();
var swig = require('swig');
var fs = require('fs');
var _request = require('request');
var Promise = require('es6-promise').Promise;
var imagify = require('./image');
var Joi = require('joi');
var uid = require('uid-safe');
var lwip = require('lwip');
var sha1 = require('sha1');
var EventEmitter = require('events').EventEmitter;
var fileCreated = new EventEmitter();



module.exports = {
  index: {
    handler: function (request, reply) {


      var url = request.query.url;
      var name = sha1(url) + '.jpeg';
      var img_path = 'img/' + name;


      fileCreated.on(img_path, function (ray) {
        console.log(ray);
        setTimeout(function () {
          fs.unlink(img_path, function (err, results) {
            if (err) console.log('File Doesnt exists');
            else console.log('deleted!');
          });
        }, 10000);

      });


      return new Promise(function (resolve) {
        imagify.download(url, name, function () {

          lwip.open(img_path, function (err, image) {

            var width = parseInt(request.query.resize_width) || image.width();
            var height = parseInt(request.query.resize_height) || image.height();

            image.resize(width, height, function (err, img) {
              img.writeFile(img_path, function (err) {
                resolve();
              });
            });

          });

        });
      }).then(function () {
        return new Promise(function (res) {
          fileCreated.emit(img_path, 'GAMMA');
          reply.file(img_path);
        });
      });
    },
    validate: {
      query: {
        url: Joi.string(),
        resize_width: Joi.string(),
        resize_height: Joi.string(),
        crop_width: Joi.string(),
        crop_height: Joi.string()
      }
    }
  }
};