const consola = require('consola');
const bcrypt = require('bcryptjs');

const knex = require('../database');
const { createJWT } = require('../helpers/token');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [ data ] = await knex('users')
      .select([ 'username', 'password' ])
      .where({ username });

    if (!data) {
      throw new Error('Bad password or username');
    }

    if (!bcrypt.compareSync(password, data.password)) {
      throw new Error('Bad password');
    }

    const token = await createJWT({ username });

    res.json({ token });
  } catch (e) {
    consola.error(e);
    res.status(400).send();
  }
};

exports.register = async (req, res) => {
  const { email, username, password, name, first_name } = req.body;

  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    await knex('users')
      .insert({
        email,
        username,
        password: hash,
        name,
        first_name,
      });

    res.status(200).send();
  } catch (e) {
    consola.error(e);
    res.status(400).send();
  }
};

exports.getUserProfil = async (req, res) => {
  const { username } = req.params;

  try {
    const [data] = await knex('users')
      .select(['username', 'name', 'first_name', 'gender', 'biography'])
      .where({ username });

    res.json(data);
  } catch (e) {
    consola.error(e);
    res.status(400).send();
  }
}
