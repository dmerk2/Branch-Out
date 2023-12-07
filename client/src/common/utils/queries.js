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
