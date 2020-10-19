
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_visits').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_visits').insert([
        {username: 'username1', visited_username: 'username2'},
        {username: 'username1', visited_username: 'username3'},
        {username: 'username1', visited_username: 'username4'},
        {username: 'username2', visited_username: 'username1'},
        {username: 'username3', visited_username: 'username1'},
        {username: 'username4', visited_username: 'username1'},
      ]);
    });
};
