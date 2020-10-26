
var visits = []

for (var x = 0; x < 50; x++) {
  visits[x] = {username: 'username' + x, visited_username: 'username1'}
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_visits').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_visits').insert(visits);
    });
};
