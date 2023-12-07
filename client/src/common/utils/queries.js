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
    users(where: { OR: [{ username: $username }, { email: $email }] }) {
      _id
      username
      email
    }
  }
`;

export const GET_FRIENDS = gql`
  query GetFriends($id: ID) {
    user(_id: $id) {
      friends {
        _id
        username
        email
        profileImage
        bio
      }
    }
  }
`;
