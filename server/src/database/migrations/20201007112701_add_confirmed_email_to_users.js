exports.up = function (knex) {
  return knex.schema.table('users', (table) => {
    table.boolean('confirmed_email').defaultTo(false);
  });
};

exports.down = function (knex) {
  knex.schema.table('users', function(table) {
    table.dropColumn('confirmed_email');
  })
};
