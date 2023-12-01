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

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    updateUser(_id: ID!, username: String, email: String, password: String): User
    deleteUser(_id: ID!): User

    addPost(user: ID!, content: String!): Post
    updatePost(_id: ID!, content: String): Post
    deletePost(_id: ID!): Post

    addComment(post: ID!, user: ID!, content: String!): Comment
    updateComment(_id: ID!, content: String): Comment
    deleteComment(_id: ID!): Comment
  }
`;

module.exports = typeDefs;