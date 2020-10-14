exports.up = function(knex) {
  return knex.schema.createTable('visits', (table) => {
    table.increments()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.string('username').notNullable().unique()
    table.string('visited_username').notNullable().unique()
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('visits')
}
