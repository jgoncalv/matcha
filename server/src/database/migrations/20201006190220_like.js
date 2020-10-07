exports.up = function(knex) {
  return knex.schema.createTable('likes', (table) => {
    table.increments()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.string('username').notNullable()
    table.string('username_liked').notNullable()

    table.unique(['username', 'username_liked']);

    table
      .foreign('username')
      .references('username')
      .inTable('users')
    table
      .foreign('username_liked')
      .references('username')
      .inTable('users')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('likes')
}
