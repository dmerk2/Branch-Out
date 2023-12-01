const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    profileImage: String
    bio: String
    friends: [User]
    posts: [Post]
    likedPosts: [Post]
  }

  type Post {
    _id: ID
    user: [User]
    content: String!
    createdAt: String
    likes: [User]
    comments: [Comment]
  }

  type Comment {
    _id: ID
    post: [Post]
    user: [User]
    content: String!
    createdAt: String
  }

  type Query {
    users: [User]
    posts: [Post]
    comments: [Comment]
  }
`;

module.exports = typeDefs;