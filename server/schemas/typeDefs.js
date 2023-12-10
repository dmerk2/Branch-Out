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
    messages: [Message]
    comments : [Comment]
  }

  type Message {
    _id: ID
    sender: User
    receiver: User
    content: String!
    timestamp: String
  }

  type Post {
    _id: ID
    user: User
    content: String!
    createdAt: String
    likes: [User]
    likeCount: Int
    dislikes: [User]
    dislikeCount: Int
    comments: [Comment]
  }

  type PostInteracted {
    _id: ID!
    likeCount: Int!
    dislikeCount: Int!
  }

  type Comment {
    _id: ID
    post: Post
    user: User
    content: String!
    createdAt: String!
  }

  type PresignedUrlResponse {
    presignedUrl: String
    key: String
  }

  type Query {
    users: [User]
    searchUsers(username: String!): [User]
    posts: [Post]
    comments: [Comment]
    checkUsernameEmailExists(username: String!, email: String!): [User]
    user(_id: ID): User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, bio: String, profileImage: String): Auth
    updateUser(_id: ID!, username: String, email: String, password: String): User
    deleteUser(_id: ID!): User

    addPost(user: ID!, content: String!): Post
    updatePost(_id: ID!, content: String): Post
    deletePost(_id: ID!): Post

    addComment(post: ID!, user: ID!, content: String!): Comment
    updateComment(_id: ID!, content: String): Comment
    deleteComment(_id: ID!): Comment

    getPresignedUrl(key: String!): PresignedUrlResponse

    likePost(postId: ID!): PostInteracted
    dislikePost(postId: ID!): PostInteracted
  }
`;

module.exports = typeDefs;
