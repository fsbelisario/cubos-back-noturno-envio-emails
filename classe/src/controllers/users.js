const knex = require('../connection');

const enroll = async (req, res) => {
  const { name, email } = req.body;

  if (!name) {
    return res.status(404).json('O campo nome é obrigatório');
  }

  if (!email) {
    return res.status(404).json('O campo email é obrigatório');
  }

  try {
    const verifyUser = await knex('users').where({ email }).first();

    if (!!verifyUser) {
      return res.status(400).json(`O email ${email} já foi cadastrado.`);
    };

    const user = await knex('users').insert({ name, email }).returning('*');

    if (!user) {
      return res.status(400).json('Não foi possível cadastrar o usuário.');
    };

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(error.message);
  };
};

module.exports = { enroll };