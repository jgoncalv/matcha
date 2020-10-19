exports.up = function (knex) {
  return knex.schema.createTable('users_visits', (table) => {
    table.increments();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('visited_at').defaultTo(knex.fn.now());
    table.string('username').notNullable()
    table.string('visited_username').notNullable()

    table
      .foreign('username')
      .references('username')
      .inTable('users');
    table
      .foreign('visited_username')
      .references('username')
      .inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users_visits');
};
