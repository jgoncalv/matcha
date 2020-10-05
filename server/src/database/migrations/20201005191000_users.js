exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table
      .string('username')
      .notNullable()
      .unique()
    table.string('email').notNullable().unique()
    table.timestamp('createdAt').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
