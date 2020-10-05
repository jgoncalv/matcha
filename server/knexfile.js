module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '1234',
      database: 'matcha',
      typeCast(field, next) {
        if (field.type === 'TINY' && field.length === 1) {
          return field.string() === '1' // 1 = true, 0 = false
        }
        return next()
      }
    },
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }
  },
}
