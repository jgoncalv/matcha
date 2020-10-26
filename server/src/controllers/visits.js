const consola = require('consola');

const knex = require('../database');

/**
 * Add a visit and return the newly created visit
 * @param {Object} req
 * @param {string} req.params.username - Username passed in the ur
 * @param {string} req.body.visited_username
 * @param res
 * @returns {Promise<void>}
 */
exports.addUserVisit = async (req, res) => {
  const { username } = req.params;
  const { visited_username } = req.body;

  try {
    await knex.transaction(async function(trx) {
      let visit_id;
      const [data] = await trx('users_visits')
        .select(['id'])
        .where({ username, visited_username })
        .limit(1);

      if (!data) {
        const [newVisit] = await trx('users_visits')
          .insert({ username, visited_username })
          .returning(['id'])
        visit_id = newVisit.id;
      } else {
        visit_id = data.id;
        await knex('users_visits')
          .where('id', visit_id)
          .update('updated_at', Date.now())
      }
      await trx('users_visits')
        .insert({ username, visit_id });
    })

    res.status(200).send();
  } catch (e) {
    consola.error(e);
    res.status(400).send();
  }
};

exports.getVisits = async (req, res) => {
  const { username } = req.user;
  const page = req.query.page - 1; // on n'accepte pas la page 0
  const maxNumberReturn = 10;

  try {
    const visitsPromise = knex('users_visits')
      .select(['id', 'username', 'visited_at'])
      .where({visited_username: username})
      .offset(page * maxNumberReturn)
      .limit(maxNumberReturn)
      .orderBy('visited_at');

    const totalPromise = knex('users_visits')
      .where({ visited_username: username })
      .count();


    var [visits, total] = await Promise.all([visitsPromise, totalPromise])

    total = total[0].count

    res.json({ visits, total, number_of_pages: Math.ceil(total / maxNumberReturn) });
  } catch (e) {
    consola.error(e);
    res.status(400).send();
  }
};
