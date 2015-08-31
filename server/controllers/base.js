// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
require('dotenv').load();
var fs = require('fs');
var Promise = require('es6-promise').Promise;
var imagify = require('./image');
var Joi = require('joi');
var lwip = require('lwip');
var sha1 = require('sha1');
var EventEmitter = require('events').EventEmitter;
var fileCreated = new EventEmitter();
// var http = require('http');
// var https = require('https');
var imageType = require('image-type');

function ratio(width, height) {
  return width / height;
}

var acceptedExt = ['jpeg', 'png', 'gif', 'jpg', 'JPG', 'JPEG', 'PNG', 'GIF'];


module.exports = {
  img: {
    handler: function (request, reply) {
      "use strict";

      var url = request.query.url;
      var fileType, typeObj;
      var protocol = url.split(':')[0];
      var http = (protocol == 'http') ? require('http') : require('https');


      http.get(url, function (res) {
        res.once('data', function (chunk) {
          res.destroy();
          typeObj = imageType(chunk);
          fileType = (typeObj !== null) ? typeObj.ext : null;

          if (fileType === null) {
            reply('Your image is invalid');
          }

          if (acceptedExt.indexOf(fileType) !== -1 || fileType !== null) {

            var name = sha1(url) + '.' + fileType;
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

                  if (image === null) {
                    fileCreated.emit(img_path, 'GAMMA');
                    reply('image is invalid');
                  }

                  if (image !== null) {

                    var width, height, ifNotGiven, batch = image.batch();

                    if (request.query.resize_width || request.query.resize_height) {

                      if (request.query.resize_width && request.query.resize_height) {

                        width = parseInt(request.query.resize_width);
                        height = parseInt(request.query.resize_height);

                      } else if (request.query.resize_width && !request.query.resize_height) {

                        width = parseInt(request.query.resize_width);
                        height = width / ratio(image.width(), image.height());

                      } else if (!request.query.resize_width && request.query.resize_height) {

                        height = parseInt(request.query.resize_height);
                        width = height * ratio(image.width(), image.height());
                      } else {

                        width = image.width();
                        height = image.height();
                      }

                      batch.resize(width, height);

                    }

                    if (request.query.crop_width && request.query.crop_height) {

                      batch.crop(parseInt(request.query.crop_width), parseInt(request.query.crop_height));

                    }

                    batch.writeFile(img_path, function (err) {
                      resolve();
                    });

                  }
                });

              });
            }).then(function () {
              return new Promise(function (res) {
                fileCreated.emit(img_path, 'GAMMA');
                reply.file(img_path);
              });
            });

          } else {
            reply('invalid image');
          }

        });
      });

    },
    validate: {
      query: {
        url: Joi.string().required(),
        resize_width: Joi.string(),
        resize_height: Joi.string(),
        crop_width: Joi.string(),
        crop_height: Joi.string(),
        token: Joi.string()
      }
    }
  }
};