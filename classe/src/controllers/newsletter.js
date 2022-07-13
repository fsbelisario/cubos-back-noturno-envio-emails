const knex = require('../connection');
const nodemailer = require('../nodemailer');

const send = async (req, res) => {
  const { emailBody } = req.body;

  if (!emailBody) {
    return res.status(400).json('É necessário informar o texto para composição da newsletter.');
  };

  try {
    const users = await knex('users').select('email');

    if (!users) {
      return res.status(400).json('Nenhum usuário cadastrado para envio da newsletter.');
    };

    let emailList = [];

    users.forEach(user => {
      emailList.push(user.email);
    });

    const emailData = {
      from: 'Cilindros <no-reply@cilindros.com>',
      bcc: emailList.join(', '),
      subject: 'Temos novidades da Cilindros pra você!',
      template: 'newsletter',
      context: {
        emailBody
      }
    };

    nodemailer.sendMail(emailData);

    return res.status(200).json('Newsletter enviada!');
  } catch (error) {
    return res.status(400).json(error.message);
  };
};

module.exports = { send };