import { gql } from "@apollo/client";

export const SEARCH_USERS = gql`
  query searchUsers {
    users {
      _id
      username
    }
  }
`;

export const CHECK_USERNAME_EMAIL_EXISTS = gql`
query checkUsernameEmailExists($username: String!, $email: String!) {
  checkUsernameEmailExists(username: $username, email: $email) {
    _id
    username
    email
  }
}
`;

export const GET_USER_INFO = gql`
  query getUserInfo($id: ID!) {
    user(_id: $id) {
      username,
      bio,
      friends {
        _id
        username
        email
        profileImage
        bio
      },
      posts {
        _id
        content
        createdAt
        comments {
          _id
          content
          createdAt
        }
      },
      profileImage
    }
  }
`;

export const GET_USER_POSTS = gql`
  query GetUserPosts($id: ID) {
    user(_id: $id) {
      _id
      posts {
        _id
        content
        createdAt
      }
    }
  }
`;

