const consola = require('consola');

const knex = require('../database');

/**
 * Like or unlike increments or decrement the score of the user
 * @param {Object} req
 * @param {boolean} req.body.like - Set Like true or false
 * @param {boolean} req.params.username - This is the user we want to like
 * @param {boolean} req.user.username - The logged user
 * @param res
 * @returns {Promise<void>}
 */
exports.like = async (req, res) => {
  const username_liked = req.params.username;
  const { username } = req.user;
  const { like } = req.body;

  try {
    if (like) {

      await knex.transaction(async function (trx) {
        await trx('likes')
          .insert({
            username,
            username_liked,
          });
        await trx('users')
          .where({ username })
          .increment('score', 1 );
      });

    } else {
      await knex.transaction(async function(trx) {
        await trx('likes')
        .where({
          username,
          username_liked,
        })
        .del();
        await trx('users')
          .where({ username })
          .decrement('score', 1);
      })
    }

    res.status(200).send();
  } catch (e) {
    consola.error(e);
    res.status(400).send();
  }
};
