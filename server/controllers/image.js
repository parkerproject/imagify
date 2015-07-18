var lwip = require('lwip');
var fs = require('fs');
var _request = require('request');



function download(uri, filename, callback) {
  'use strict';
  _request.head(uri, function (err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    _request(uri).pipe(fs.createWriteStream('img/' + filename)).on('close', callback);
  });
}

function crop_image(img_path, width, height) {
  'use strict';
  lwip.open(img_path, function (err, image) {
    image.batch()
      .crop(width, height)
      .writeFile(img_path, function (err) {
        console.log('image cropped');
      });
  });
}

module.exports.crop_image = crop_image;
module.exports.download = download;