exports.up = function (knex) {
  return knex.schema.table('users', (table) => {
    table.enu('sexual_orientation', ['hetero', 'homo']);
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('sexual_orientation');
  })
};
