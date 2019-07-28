import React from 'react';
import { gql } from 'apollo-boost'; //GraphQL to javascript parser
import { graphql } from 'react-apollo'; // binds apollo to react

// This is a component that picks an author from a list and add a book written by that author.
// define our book query
const getAuthorsQuery = gql`
  {
    Authors {
      name
      id
    }
  }
`;

// component
const AddBook = props => {
  // console.log(props)
  return (
    <form id="add-book" action="">
      <div className="field">
        <label htmlFor="">Book name</label>
        <input type="text" />
      </div>
      <div className="field">
        <label htmlFor="">Genre</label>
        <input type="text" />
      </div>
      <div className="field">
        <label htmlFor="">Author</label>
        <select name="" id="">
          <option value="">Select author</option>
        </select>
        </div>

        <button>+</button>
    </form>
  );
};

export default graphql(getAuthorsQuery)(AddBook); //the point where the query is bound to the component
