exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table
      .string('username')
      .notNullable()
      .unique()
    table.string('email').notNullable().unique()
    table.string('name').notNullable()
    table.string('first_name').notNullable()
    table.string('password').notNullable()
    table.string('gender')
    table.string('biography')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
