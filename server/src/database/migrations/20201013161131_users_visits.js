exports.up = function (knex) {
  return knex.schema.createTable('users_visits', (table) => {
    table.increments();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('username').notNullable();
    table.integer('visit_id').unsigned().notNullable();

    table.unique([ 'username', 'visit_id' ]);
    table
      .foreign('username')
      .references('username')
      .inTable('users');
    table
      .foreign('visit_id')
      .references('id')
      .inTable('visits');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users_visits');
};
