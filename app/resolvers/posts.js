const {
  findPostById,
  createPost,
  updatePost,
  deletePost
} = require('app/actions/users'); 

export default {
  Query: {
    getPostById: (parent, {postId}) => findPostById(postId)
  },
  Mutation: {
    createPost: (parent, {title, body, token}) => {
      return createPost({title, password})
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