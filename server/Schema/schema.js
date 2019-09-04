//require the main graphql
const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/books')
const Author = require('../models/author')
//in creating our schema,

//We destructure graphql to obtain the graphql object data template
//next we destructure graphql to get the string
const { GraphQLObjectType, GraphQLString, 
  GraphQLSchema, 
  GraphQLID, 
  GraphQLInt, 
  GraphQLList,
  GraphQLNonNull
} = graphql;


//define book object type
//this type contains all the property that a user can request for
const BookType = new GraphQLObjectType({
  name: 'Book',
  //when we have multiple types,and they have references to one another, unless we wrap those fields in a function, one type might not necessarily know what another typr is. so that when we have multiple types, it will help prevent reference errors.
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    // find book author
    author: {
      type: AuthorType,
      resolve(parent, args) {
      //  return _.find(authors, { id: parent.authorID });
      return Author.findById(parent.authorID);
      }
    }
  })
});

//define author object type
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  //when we have multiple types,and they have references to one another, unless we wrap those fields in a function, one type might not necessarily know what another typr is. so that when we have multiple types, it will help prevent reference errors.
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    // find list of books written  by author
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        //  return _.filter(books,{authorID:parent.id});
        return Book.find({authorID:parent.id})
       
      }
    }
  })
});

//next we defined root query, how user can easily get data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  // each one of the fields can be a type of root query
  fields: {
    // query for a particular book by id
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/other source
        // use lodash to look through the books array and find the book with the id of id
        // return _.find(books, { id: args.id });
        return Book.findById(args.id)
      }
    },
// query for a particular author by id
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id)
      }
    },

    // query to display all books/ books and their author
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books
        return Book.find({});
      }
    }, 
    // query to display all authors / authors and their books
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors
        return Author.find({})
      }
    }
  }
});

// to create a new instance of an author 
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // allows u to add aauthor to the database
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        age: {type: GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        })
        // saves created data to database
        return author.save()
      }
    },

    // allows you to add book to the database
    addBook: {
      type: BookType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: GraphQLNonNull(GraphQLString)},
        authorID: {type: GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorID: args.authorID
        })
        // saves created data to database
        return book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
