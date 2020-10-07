exports.up = function(knex) {
  return knex.schema.createTable('interests', (table) => {
    table.increments()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.string('title').notNullable().unique()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('interests')
}
