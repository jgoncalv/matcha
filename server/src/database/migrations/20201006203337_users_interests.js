exports.up = function (knex) {
  return knex.schema.createTable('users_interests', (table) => {
    table.increments();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('username').notNullable();
    table.integer('interest_id').unsigned().notNullable();

    table.unique([ 'username', 'interest_id' ]);
    table
      .foreign('username')
      .references('username')
      .inTable('users');
    table
      .foreign('interest_id')
      .references('id')
      .inTable('interests');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users_interests');
};
