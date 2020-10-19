require('dotenv').config();
const bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);

function createPwdHash(pwd) {
  return bcrypt.hashSync(pwd, salt)
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'username2', email: 'user2@yopmail.com',  name: 'name2', first_name : 'first_name2', password: createPwdHash("password2"), confirmed_email: true },
        {username: 'username3', email: 'user3@yopmail.com',  name: 'name3', first_name : 'first_name3', password: createPwdHash("password3"), confirmed_email: true },
        {username: 'username4', email: 'user4@yopmail.com',  name: 'name4', first_name : 'first_name4', password: createPwdHash("password4"), confirmed_email: true },
      ]);
    });
};
