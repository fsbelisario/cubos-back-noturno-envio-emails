const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '3c8a75f560fa3b',
    pass: '162b098160977b'
  }
});

transporter.use('compile', hbs({
  viewEngine: {
    extname: '.handlebars',
    defaultLayout: false
  },
  viewPath: './src/views/'
}));

module.exports = transporter;