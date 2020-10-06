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
    const data = await knex.transaction(async function(trx) {
      const interestsPromise = trx('users_interests')
        .leftJoin('interests', 'users_interests.interest_id', 'interests.id')
        .select({
          title: 'interests.title',
        })
        .where('users_interests.username', username)
        .limit(50);

      const profilPromise = trx('users')
        .select(['username', 'name', 'first_name', 'gender', 'biography'])
        .where({ username })
        .limit(1);

      const likeScorePromise = trx('likes')
        .count()
        .where({ username });

      const [interests, [profil], score] = await Promise.all([interestsPromise, profilPromise, likeScorePromise]);

      return {
        ...profil,
        interests,
        score: score[0].count,
      }
    })

    res.json(data);
  } catch (e) {
    consola.error(e);
    res.status(400).send();
  }
}

/**
 * Add an interest for the user and if not created create the new one in the interests table
 * @param req
 * @param {string} req.params.username - Username passed in the url
 * @param {string} req.body.interest - The interest the user want to add
 * @param res
 * @returns {Promise<void>}
 */
exports.addUserInterest = async (req, res) => {
  const { username } = req.params;
  const { interest } = req.body;

  try {

    await knex.transaction(async function(trx) {
      let interest_id;
      const [data] = await trx('interests')
        .select(['id'])
        .where({ title: interest })
        .limit(1);

      if (!data) {
        const [newInterest] = await trx('interests')
          .insert({ title: interest })
          .returning(['id'])
        interest_id = newInterest.id;
      } else {
        interest_id = data.id;
      }
      await trx('users_interests')
        .insert({ username, interest_id });
    })

    res.status(200).send();
  } catch (e) {
    consola.error(e);
    res.status(400).send();
  }
};
