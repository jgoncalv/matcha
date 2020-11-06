exports.up = function(knex) {
  return knex.schema.createTable('blocks', (table) => {
    table.increments()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.string('username').notNullable()
    table.string('username_blocked').notNullable()

    table.unique(['username', 'username_blocked']);

    table
      .foreign('username')
      .references('username')
      .inTable('users')
    table
      .foreign('username_blocked')
      .references('username')
      .inTable('users')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('blocks')
}
