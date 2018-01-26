const {
  findUserById,
  login,
  signup
} = require('app/actions/users'); 

export default {
  Query: {
    getUserById: (parent, {userId}) => findUserById(userId)
  },
  Mutation: {
    signupUser: (parent, {email, password}) => {
      return signup({email, password})
      .then(({token, user}) => {
        return {token, user, errors: null};
      })
      .catch((errors) => {
        return {token: null, user: null, errors};
      })
    },
    login: (parent, {email, password}) => {
      return login({email, password})
      .then(({token, user}) => {
        return {token, user, errors: null};
      })
      .catch((errors) => {
        return {token: null, user: null, errors};
      })
    } 
  }
}