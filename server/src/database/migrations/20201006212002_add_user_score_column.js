exports.up = function (knex) {
  return knex.schema.table('users', (table) => {
    table.integer('score').unsigned().defaultTo(0);
  });
};

exports.down = function (knex) {
  knex.schema.table('users', function(table) {
    table.dropColumn('score');
  })
};
