import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      books
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      books
    }
  }
`;

 
 

export const GET_ME = gql`
  query getMe {
     me {
    _id
    books {
      authors
      bookId
      description
      image
      link
      title
    }
    email
    username
    }
  }
`;
