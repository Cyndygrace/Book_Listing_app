import React from 'react';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo"


// Components
import BookList from './Components/BookList'

import AddBook from './Components/AddBook'

// apollo client setup
const client = new ApolloClient({
//  this allows appolo to know tha it will be making a request to a graphql server
  uri:'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main">
      <h1>For Your Reading Pleasure</h1>
      <BookList />
      <AddBook/>
    </div>
    </ApolloProvider>
  );
}

export default App;
