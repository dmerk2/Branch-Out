import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $bio: String
    $profileImage: String
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      bio: $bio
      profileImage: $profileImage
    ) {
      token
      user {
        _id
        username
        password
        bio
        profileImage
      }
    }
  }
`;

export const GET_PRESIGNED_URL = gql`
  mutation GetPresignedUrl($key: String!) {
    getPresignedUrl(key: $key) {
      presignedUrl
      key
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($user: ID!, $content: String!) {
    addPost(user: $user, content: $content) {
      _id
      user {
        _id
      }
      content
      createdAt
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      _id
      likeCount
    }
  }
`;

export const DISLIKE_POST = gql`
  mutation dislikePost($postId: ID!) {
    dislikePost(postId: $postId) {
      _id
      dislikeCount
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation unlikePost($postId: ID!, $userId: ID!) {
    unlikePost(postId: $postId, userId: $userId) {
      _id
      likes {
        _id
      }
    }
  }
`;

export const UNDISLIKE_POST = gql`
  mutation undislikePost($postId: ID!, $userId: ID!) {
    undislikePost(postId: $postId, userId: $userId) {
      _id
      dislikes {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($post: ID!, $user: ID!, $content: String!) {
    addComment(post: $post, user: $user, content: $content) {
      _id
      post {
        _id
      }
      user {
        _id
      }
      content
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($userId: ID!) {
    addFriend(userId: $userId) {
      _id
      username
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $bio: String
    $username: String
    $email: String
  ) {
    updateUser(_id: $id, username: $username, bio: $bio, email: $email) {
      bio
      username
      email
    }
  }
`;
