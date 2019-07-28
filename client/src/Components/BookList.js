import React from 'react';
import { gql } from 'apollo-boost'; //GraphQL to javascript parser
import { graphql } from 'react-apollo'; // binds apollo to react

// define our book query
const getBookQuery = gql`
  {
    books {
      name
      id
    }
  }
`

// component
function BookList() {
  return (
    <div>
      <ul id="book-list">
        <li>Book Name</li>
      </ul>
    </div>
  );
}

export default graphql(getBookQuery)(BookList); //the point where the query is bound to the component


