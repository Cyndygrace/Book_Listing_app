import React from 'react';
// import { gql } from 'apollo-boost'; //GraphQL to javascript parser
import { graphql } from 'react-apollo'; // binds apollo to react
import {getAuthorsQuery} from '../Queries/queries'

// This is a component that picks an author from a list and add a book written by that author.
// define our book query

// Query moved to query file
// component
const AddBook = props => {
  // console.log(props)
  function displayAuthors() {
    var data = props.data;
    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }
  return (
    <form id="add-book">
      <div className="field">
        <label htmlFor="">Book name</label>
        <input type="text" />
      </div>
      <div className="field">
        <label htmlFor="">Genre</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Author</label>
        <select>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default graphql(getAuthorsQuery)(AddBook); //the point where the query is bound to the component
