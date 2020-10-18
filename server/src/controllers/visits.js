const consola = require('consola');

const knex = require('../database');

/**
 * Search list of users who visit the connected user
 * @param {Object} req
 * @param {string} req.query.username
 * @param res
 * @returns {Promise<void>}
 */
exports.searchVisits = async (req, res) => {
  const { username } = req.query;

  try {
    const visits = await knex('visits')
      .select(['username', 'updated_at'])
      .where('visited_username', username)
      .limit(50);

    res.json({ visits });
  } catch (e) {
    consola.error(e);
    res.status(400).send();
  }
};
