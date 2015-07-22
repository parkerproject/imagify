require('dotenv').load();
var Analytics = require('analytics-node');
var analytics = new Analytics(process.env.SEGMENT_API, {
  flushAt: 1
});
var swig = require('swig');
var collections = ['users'];
var db = require("mongojs").connect(process.env.IMAGIFY_MONGODB_URL, collections);
var randtoken = require('rand-token');
var user_id = randtoken.generate(7);
var sendEmail = require('./sendEmail');


function identify(data) {
  analytics.identify({
    userId: data.userId,
    traits: {
      email: data.email,
      name: data.name
    }
  });
}



module.exports = {
  index: {
    handler: function(request, reply) {

      var data = {
        email: request.payload.user_email,
        name: request.payload.name,
        userId: user_id,
        confirm_email: 'no'
      };

      db.users.update({
        email: data.email
      }, data, {
        upsert: true
      }, function(err, doc) {

        if (err) {
          reply({
            status: 'failed'
          });
        } else {
          identify(data);

          var message = (doc.updatedExisting) ? 'You have already registered! We just sent you an activation email.' : 'Please check your inbox to verify your email.';

          swig.renderFile(__base + 'server/views/confirmEmail.html', {
              name: data.name,
              url: 'http://imagify.co/activate?user=' + data.userId + '&email=' + data.email + '&name=' + data.name
            },
            function(err, content) {
              if (err) {
                throw err;
              }
              var subject = 'imagify - Please activate your account';
              sendEmail(data.email, subject, content);
              reply({
                status: message
              });
            });

        }

      });

    }
  }
};