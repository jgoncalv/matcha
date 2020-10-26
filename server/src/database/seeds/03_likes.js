
var likes = []

for (var x = 0; x < 50; x++) {
  likes[x] = {username: 'username' + x, username_liked: 'username1'}
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('likes').del()
    .then(function () {
      // Inserts seed entries
      return knex('likes').insert(likes);
    });
};
