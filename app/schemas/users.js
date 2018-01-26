export default `
  type User {
    id: ID!,
    email: String!
  }

  type Query {
    getUserById(userId: ID!): User!
  }

  type authErrors {
    email : String,
    password: String
  }

  type authResponse {
    token: String,
    user: User,
    errors: authErrors
  }

  type Mutation {
    signupUser(email: String!, password: String!) : authResponse!,
    login(email: String!, password: String!) : authResponse!
  }
`;