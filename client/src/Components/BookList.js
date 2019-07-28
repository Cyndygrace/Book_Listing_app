import React from 'react';
// import { gql } from 'apollo-boost'; //GraphQL to javascript parser
import { graphql } from 'react-apollo'; // binds apollo to react
import {getBookQuery} from '../Queries/queries'

// define our book query
// const getBookQuery = gql`
//   {
//     books {
//       name
//       id
//     }
//   }
// `

// component
const  BookList = props =>  {
  // console.log(props)
  function displayBooks(){
    var data = props.data //this contains the result from ther server
    if (data.loading) {
      return (<div>Loading books...</div>)
    } else {
      return data.books.map(book => {
        return(
          <li key={book.id}>{book.name}</li>
        );
      })
    }
  }
  return (
    <div>
      <ul id="book-list">
        <li>{displayBooks()}</li>
      </ul>
    </div>
  );
}

export default graphql(getBookQuery)(BookList); //the point where the query is bound to the component


