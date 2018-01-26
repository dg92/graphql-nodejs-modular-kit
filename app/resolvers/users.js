const {table} = require('app/orm');


export default {
  Query: {
    getUser: (parent, {userId}) => {
      return table('users').find({id: userId}).then((user) => user);
    },
    allUsers: (parent, args) => {
      return table('users').all().then((users) => {
        console.log(users)
        return users;
      });
    }
  },
  Mutation: {
    register: (parent, {email, password}) => {
      console.log(email, password)
      return table('users').insert({email, password}).then((user) => {
        console.log(user)
        return {
          id: user.id,
          email: user.email
        }
      })
    }
  }
}