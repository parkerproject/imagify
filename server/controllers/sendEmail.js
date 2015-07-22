require('dotenv').load();
var domain = 'sandbox069a93c4f3434558b73eb6e0e0cf7a42.mailgun.org';
var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_KEY,
  domain: domain
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