const consola = require('consola')
const bcryptjs = require('bcryptjs')

const knex = require('../db/knex')
const { createJWT } = require('../helpers/token')

exports.login = async (req, res) => {
  const { username, password } = req.body

  try {
    const [data] = await knex('users')
      .select(['username', 'password'])
      .where({ username })

    if (!data) {
      throw new Error('Bad password or username')
    }

    if (!bcryptjs.compareSync(password, data.password)) {
      throw new Error('Bad password')
    }

    const token = await createJWT({ username })

    res.json({ token })
  } catch (e) {
    consola.error(e)
    res.status(400).send()
  }
}
