require('dotenv').config();
const bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);

function createPwdHash(pwd) {
  return bcrypt.hashSync(pwd, salt)
}

var users = []

for (var x = 0; x < 50; x++) {
  users[x] = {username: 'username' + x, email: 'user' + x + '@yopmail.com',  name: 'name' + x, first_name : 'first_name' + x, password: createPwdHash("password" + x), confirmed_email: true };
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(users);
    });
};
