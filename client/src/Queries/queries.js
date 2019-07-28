import { gql } from 'apollo-boost'; //GraphQL to javascript parser


// define our book query
const getBookQuery = gql`
  {
    books {
      name
      id
    }
  }
`


const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export {getAuthorsQuery, getBookQuery}