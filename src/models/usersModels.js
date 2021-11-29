const connection = require('./connection');

const USERS = 'users';

async function createNewUser(newUserData) {
  return connection()
    .then((db) => db.collection(USERS)
      .insertOne(newUserData))
    .then((result) => result.ops);
}

async function getEmail(email) {
  return connection()
    .then((db) => db.collection(USERS).findOne({ email }));
}

module.exports = {
  createNewUser,
  getEmail,
};