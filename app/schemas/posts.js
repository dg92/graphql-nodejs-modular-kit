// export default `
//   type Post {
//     id: ID!,
//     body: String!,
//     title:  String!
//   }

//   type Query {
//     getPostById(postId: ID!): Post!
//   }

//   type PostErrors {
//     body : String,
//     title: String,
//     id: String
//   }

//   type Response {
//     post: Post,
//     errors: PostErrors
//   }

//   type Mutation {
//     createPost(body: String!, title: String!) : Response!,
//     updatePost(id: ID!, body: String!, title: String!) : Response!,
//     deletePost(id: ID!) : Response!
//   }
// `;