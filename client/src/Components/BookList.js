import React from 'react';
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


