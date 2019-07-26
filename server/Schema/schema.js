//require the main graphql
const graphql = require('graphql');
const _ = require('lodash');
//in creating our schema,

//We destructure graphql to obtain the graphql object data template
//next we destructure graphql to get the string
const { GraphQLObjectType, GraphQLString, 
  GraphQLSchema, 
  GraphQLID, 
  GraphQLInt, 
  GraphQLList
} = graphql;

//dummy data
var books = [
  { name: 'Name of the wind', genre: 'Fantasy', id: '1', authorID: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorID: '3' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorID: '2' },
  { name: 'The Hero of ages', genre: 'Sci-Fi', id: '4', authorID: '3' },
  { name: 'The color of Magic', genre: 'Sci-Fi', id: '5', authorID: '2' },
  { name: 'The Light Fantastic', genre: 'Sci-Fi', id: '6', authorID: '1' }
];

var authors = [
  { name: 'Patrick Rothufuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' }
];

//define a type
//this type contains all the property that a user can request for
const BookType = new GraphQLObjectType({
  name: 'Book',
  //when we have multiple types,and they have references to one another, unless we wrap those fields in a function, one type might not necessarily know what another typr is. so that when we have multiple types, it will help prevent reference errors.
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
       return _.find(authors, { id: parent.authorID });
      }
    }
  })
});

//define a type
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  //when we have multiple types,and they have references to one another, unless we wrap those fields in a function, one type might not necessarily know what another typr is. so that when we have multiple types, it will help prevent reference errors.
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
         return _.filter(books,{authorID:parent.id});
       
      }
    }
  })
});

//next we defined root query, how user can easily get data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  // each one of the fields can be a type of root query
  fields: {
    // query for a particular book
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/other source
        // use lodash to look through the books array and find the book with the id of id
        return _.find(books, { id: args.id });
      }
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
