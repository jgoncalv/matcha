const consola = require('consola');

const knex = require('../database');

/**
 * @param {Object} req
 * @param {boolean} req.body.block - Set Block true or false
 * @param {boolean} req.params.username - This is the user we want to block
 * @param {boolean} req.user.username - The logged user
 * @param res
 * @returns {Promise<void>}
 */
exports.block = async (req, res) => {
  const { username } = req.params;
  const { username_blocked, block } = req.body;

  try {
    if (block) {
      await knex('blocks')
        .insert({
          username,
          username_blocked,
        });
    } else {
      await knex('blocks')
      .where({
        username,
        username_blocked,
      })
      .del();
    }

    res.status(200).send();
  } catch (e) {
    consola.error(e);
    res.status(400).send();
  }
};
