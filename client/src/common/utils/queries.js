import { gql } from "@apollo/client";

export const SEARCH_USERS = gql`
  query searchUsers {
    users {
      _id
      username
    }
  }
`;
