require('dotenv').config();
const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      var salt = bcrypt.genSaltSync(10);
      // Inserts seed entries
      return knex('users').insert([
        {username: 'username2', email: 'user2@yopmail.com',  name: 'name2', first_name : 'first_name2', password: bcrypt.hashSync("password2", salt), confirmed_email: true },
        {username: 'username3', email: 'user3@yopmail.com',  name: 'name3', first_name : 'first_name3', password: bcrypt.hashSync("password3", salt), confirmed_email: true },
        {username: 'username4', email: 'user4@yopmail.com',  name: 'name4', first_name : 'first_name4', password: bcrypt.hashSync("password4", salt), confirmed_email: true },
      ]);
    });
};
