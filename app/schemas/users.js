export default `
  type User {
    id: ID!,
    email: String!
  }

  type Query {
    allUsers: [User]!,
    getUser(userId: ID!): User!
  }


  type LoginResponse {
    msg: String!,
    token: String!,
    errors: [Error!]
  }

  type Mutation {
    register(email: String!, password: String!) : User!,
    login(email: String!, password: String!) : LoginResponse!
  }
`;