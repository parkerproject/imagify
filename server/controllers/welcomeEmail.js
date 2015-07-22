// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
require('dotenv').load();
var collections = ['users'];
var db = require("mongojs").connect(process.env.IMAGIFY_MONGODB_URL, collections);
var swig = require('swig');
var sendEmail = require('./sendEmail');



module.exports = {
  index: {
    handler: function(request, reply) {


      db.users.update({
        userId: request.query.user,
				email: request.query.email,
				name: request.query.name
      }, {
        confirm_email: 'yes'
      }, function() {
        swig.renderFile(__base + 'server/views/welcomeEmail.html', {
            token: request.query.user,
            name: request.query.name
          },
          function(err, content) {
            if (err) {
              throw err;
            }
            var subject = 'Welcome to imagify';
            sendEmail(request.query.email, subject, content);
            reply('Your account is now action, check your email for you token');
          });
      });

    }
  }
};