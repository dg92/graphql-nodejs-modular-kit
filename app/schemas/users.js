export default `
  type User {
    id: ID!,
    email: String!,
    posts: [Post!]
  }

  type Query {
    getUserById(userId: ID!): User!
  }

  type AuthErrors {
    email : String,
    password: String
  }

  type AuthResponse {
    token: String,
    user: User,
    errors: authErrors
  }

  type Mutation {
    signupUser(email: String!, password: String!) : AuthResponse!,
    login(email: String!, password: String!) : AuthResponse!
  }
`;