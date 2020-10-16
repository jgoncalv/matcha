exports.up = function (knex) {
  return knex.schema.table('users', (table) => {
    table.integer('avatar_id').unsigned();

    table
      .foreign('avatar_id')
      .references('id')
      .inTable('users_images');
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('avatar_id');
  })
};
