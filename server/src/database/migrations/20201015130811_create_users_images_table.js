exports.up = function(knex) {
  return knex.schema.createTable('users_images', (table) => {
    table.increments()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.string('username').notNullable()
    table.string('image_path').notNullable().unique()

    table.unique(['username', 'image_path']);

    table
      .foreign('username')
      .references('username')
      .inTable('users')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users_images')
}
