require('dotenv').load();
var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN
});


module.exports = function (email, subject, html) {
  var data = {
    from: 'imagify <hello@imagify.co>',
    to: email,
    subject: subject,
    html: html
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
};