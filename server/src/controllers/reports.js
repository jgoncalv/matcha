const consola = require('consola');

const knex = require('../database');

/**
 * @param {Object} req
 * @param {boolean} req.body.report - Set Report true or false
 * @param {boolean} req.params.username - This is the user we want to report
 * @param {boolean} req.user.username - The logged user
 * @param res
 * @returns {Promise<void>}
 */
exports.report = async (req, res) => {
  const { username } = req.params;
  const { username_reported, report } = req.body;

  try {
    if (report) {
      await knex('reports')
        .insert({
          username,
          username_reported,
        });
    } else {
      await knex('reports')
      .where({
        username,
        username_reported,
      })
      .del();
    }

    res.status(200).send();
  } catch (e) {
    consola.error(e);
    res.status(400).send();
  }
};
