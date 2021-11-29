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

async function getEmailAndPassword(email, password) {
  return connection()
    .then((db) => db.collection(USERS).findOne({ email, password }));
}

module.exports = {
  createNewUser,
  getEmail,
  getEmailAndPassword,
};