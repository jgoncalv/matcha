exports.up = function (knex) {
  return knex.schema.createTable('users_visits', (table) => {
    table.increments();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('visited_at').defaultTo(knex.fn.now());
    table
      .string('username').notNullable()
      .references('username')
    table
      .string('visited_username').notNullable()
      .references('username')
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users_visits');
};
