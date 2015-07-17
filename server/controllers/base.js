// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
require('dotenv').load();
var swig = require('swig');
var fs = require('fs');
var _request = require('request');
var Promise = require('es6-promise').Promise;
var lwip = require('lwip');
var download = function (uri, filename, callback) {
  _request.head(uri, function (err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    _request(uri).pipe(fs.createWriteStream('img/' + filename)).on('close', callback);
  });
};



module.exports = {
  index: {
    handler: function (request, reply) {

      var url = request.query.url;
      var name = 'test.jpeg';
      var img_path = 'img/' + name;
      var resize_width = request.query.resize[0];
      var resize_height = request.query.resize[1];
      //var crop_width = request.query.crop[0];
      //var crop_height = request.query.crop[1];


      download(url, name, function () {

      lwip.open(img_path, function(err, image){

        image.batch()
          //.scale(0.75) // scale to 75%
          //.rotate(45, 'white') // rotate 45degs clockwise (white fill)
          //.crop(width, height) // crop a 200X200 square from center
          .resize(resize_width, resize_height)
          //.blur(5) // Gaussian blur with SD=5
          .writeFile(img_path, function (err) {
            // check err...
            reply.file(img_path);
          });

      });

      });

    },
    app: {
      name: 'index'
    }
  }
};
