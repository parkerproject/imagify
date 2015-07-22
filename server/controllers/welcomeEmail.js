// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
require('dotenv').load();
var collections = ['users'];
var db = require("mongojs").connect(process.env.IMAGIFY_MONGODB_URL, collections);
var swig = require('swig');
var sendEmail = require('./sendEmail');
var randtoken = require('rand-token');
var token = randtoken.generate(5);


module.exports = {
  index: {
    handler: function (request, reply) {

      db.users.findAndModify({
        query: {
          userId: request.query.user
        },
        update: {
          confirm_email: 'yes',
          token: token
        },
        new: true
      }, function (err, doc, lastErrorObject) {
        // doc.tag === 'maintainer'
        swig.renderFile(__base + 'server/views/welcomeEmail.html', {
            token: doc.token,
            name: doc.name
          },
          function (err, content) {
            if (err) {
              throw err;
            }
            var subject = 'Welcome to imagify';
            sendEmail(doc.email, subject, content);
            reply('Your account is now action, check your email for you token');
          });
      });

    }
  }
};