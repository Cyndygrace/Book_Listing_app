//require the main graphql
const graphql = require('grapgql');

//in creating our schema, 

//We destructure graphql to obtain the graphql object data template
//next we destructure graphql to get the string
const {GraphQLObjectType, GraphQLString} = graphql;

//define a type
const BookType = new GraphQLObjectType({
  name :'Book',
  //when we have multiple types,and they have references to one another, unless we wrap those fields in a function, one type might not necessarily know what another typr is. so that when we have multiple types, it will help prevent reference errors.
  field : () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString}
  })
})

//when we have multiple types,and they have references to one another, unless we wrap those fields in a function, one typr might not necessarily know what another typr is.
