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
