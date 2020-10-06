const consola = require('consola');

const knex = require('../database');

/**
 * Search a pattern of interests return an interest list
 * @param {Object} req
 * @param {string} req.query.search - The query of the looking interests
 * @param res
 * @returns {Promise<void>}
 */
exports.searchInterests = async (req, res) => {
  const { search } = req.query;

  try {
    const interests = await knex('interests')
      .select(['title', 'id'])
      .where('title', 'like', `%${search}%`)
      .limit(50);

    res.json({ interests });
  } catch (e) {
    consola.error(e);
    res.status(400).send();
  }
};

/**
 * Add an interest and return the newly created interest
 * @param {Object} req
 * @param {string} req.body.interest
 * @param res
 * @returns {Promise<void>}
 */
exports.addInterest = async (req, res) => {
  const { interest } = req.body;

  try {
    const [data] = await knex('interests')
      .insert({
        title: interest
      })
      .returning(['id', 'title']);

    res.json({interest: data});
  } catch (e) {
    consola.error(e);
    res.status(400).send();
  }
};
