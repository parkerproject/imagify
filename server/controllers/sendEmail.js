require('dotenv').load();
var Mailgun = require('mailgun').Mailgun;
var mg = new Mailgun(process.env.MAILGUN);

module.exports = function (email, name, subject, html) {
  mg.sendRaw('noreply@imagify.co', [email],
    subject,
    html,
    'noreply@example.com', {},
    function (err) {
      if (err) console.log('Oh noes: ' + err);
      else console.log('Success');
    });
};