
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('likes').del()
    .then(function () {
      // Inserts seed entries
      return knex('likes').insert([
        {username: 'username1', username_liked: 'username2'},
        {username: 'username1', username_liked: 'username3'},
        {username: 'username1', username_liked: 'username4'},
        {username: 'username2', username_liked: 'username1'},
        {username: 'username3', username_liked: 'username1'},
        {username: 'username4', username_liked: 'username1'},
      ]);
    });
};
