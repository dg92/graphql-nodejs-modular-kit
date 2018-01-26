const randToken = require('rand-token');
const bcrypt = require('bcryptjs');
const shape = require('shape-errors');
const {isString} = require('lodash');
const isEmail = require('is-email');
const isUuid = require('is-uuid').v4;

const authConfig = require('config').auth;
const {cache, table} = require('app/orm');
const authHash = cache.hash('auth');

const {customErrorShape} = require('app/helpers/common');

function signup(data) {
  return validateSignupData(data).then((err) => {
    return err ? (
      Promise.reject(err)
    ) : (
    findUserByEmail(data.email).then(async (user) => user ? (
        customErrorShape({email: 'User with this email already exists'})
      ) : (
        table('users').insert({
          email: data.email,
          password: await new Promise((resolve) => bcrypt.hash(data.password, 10, (_, hash) => resolve(hash)))
        }).then(() => login(data))
      ))
    );
  });
}

function findUserByEmail(email) {
  return table('users').find({email});
}

function findUserById(id) {
  return isUuid(id) ? table('users').find(id) : Promise.resolve(null);
}

function validateSignupData(data) {
  return shape({
    email: (email) => isEmail(email)? null : 'Email is invalid',
    password: (password) => isString(password) && password.length >= 6 ?
      null : 'Password is invalid. It should contain min. 6 charcters'
  }).errors(data);
}

function login({email, password}) {
  return findUserByEmail(email).then((user) => user ? (
    bcrypt.compare(password, user.password).then((res) => res ? (
      generateUniqueAuthToken(user).then((token) => ({token, user}))
    ) : (
      customErrorShape({password: 'password is not vaild'})
    ))
  ) : (
    customErrorShape({email: 'Email id is not vaild'})
  )).then(({token, user}) => {
    return {token, user, errors: null};
  });
}

function check(authKey) {
  return authHash.get(authKey).then((userId) => {
    if (userId === null) {
      return null;
    } else {
      return findUserById(userId);
    }
  });
}

function refresh(authKey) {
  return check(authKey).then((user) => {
    if (user === null) {
      return null;
    } else {
      return authHash.del(authKey)
        .then(() => generateUniqueAuthToken(user))
        .then((newToken) => (
          authHash.set(newToken, user.id, authConfig.tokenLifetime)
            .then(() => newToken)
        ))
      ;
    }
  });
}

function logout(authKey) {
  return check(authKey).then((user) => {
    if (user === null) {
      return true;
    } else {
      return authHash.del(authKey).then(() => true);
    }
  });
}

function generateUniqueAuthToken(user) {
  const key = randToken.generate(72);

  return authHash.get(key).then((existing) => {
    if (existing === null) {
      return key;
    } else {
      return generateUniqueAuthToken(user);
    }
  });
}

module.exports = {
  login,
  check,
  refresh,
  logout,
  signup,
  findUserById
};
