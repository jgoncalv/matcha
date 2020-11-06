exports.up = function(knex) {
  return knex.schema.createTable('reports', (table) => {
    table.increments()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.string('username').notNullable()
    table.string('username_reported').notNullable()

    table.unique(['username', 'username_reported']);

    table
      .foreign('username')
      .references('username')
      .inTable('users')
    table
      .foreign('username_reported')
      .references('username')
      .inTable('users')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('reports')
}
