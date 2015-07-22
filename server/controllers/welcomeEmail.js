// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
require('dotenv').load();
var collections = ['users'];
var db = require("mongojs").connect(process.env.IMAGIFY_MONGODB_URL, collections);
var swig = require('swig');
var sendEmail = require('./sendEmail');


module.exports = {
  index: {
    handler: function (request, reply) {

      reply.view('welcomeEmail.html', {

        title: 'Manipulate images on the fly'
      });

    }
  }
};