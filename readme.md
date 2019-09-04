first make sure u have node installed on ur computer
create a root folder on your desktop or any directory
then open on vscode
create a new folder inside ur root folder called server
cd in to the server folder
initialise npm on the terminal
npm init -y
This will generate our package.json file that will store all our dependencies we install.

next we install our express app
npm install express --save
This will automatically generate our package-lock.json and node-modules that will contain the express module.
This will also store express module as a dependency in our package.json file. 

next we create a new file called app.js in our server folder to kick-off our express appliction
here we first require express
then we invoke our express function and store in a variable called app


Next is to tell our app to listen to a specific port on our computer, also add a callback function that will tell us that our app is listening for the port 4000.
app.listen(4000, () => {console.log('now listening on port 4000...')})
So when we run the app on node, we see the callback function
node app.js

next we install nodemon to listen for realtime changes so that we do not need to re-run our express-app everytime we make new changes. 
npm install nodemon --save
This will also add nodemon as a dependency to our package,json file

we run our express app with nodemon using
npx nodemon app.js
or nodemon app.js

next is to setup our graphQl

first we install our grapgql module  and express-graphql that allows express understand/communicate with our graphql, and also to provide a simple way to create an express server to run the graphql api.
npm install graphql express-graphql --save


next we require express-graphql into the app file in our server as
const graphqlHTTP = require('express-graphql')
we use the graphql as middleware on a single route and this route will be like an end-point to interact with our graphql data

next, we setup some middleware which on the graphql that all the request will be sent to
app.use('graphql', graphqlHTTP({

}))
when someone sends a request through the graphql route, express(which do not understand graphql) will send it to the grahqlHTTP function to process it 

express-graphql alias graphqlHTTP is a function that takes an object schema
the schema will tell express-graphql about our data and how our graph will look (datatypes, properties, relationships)

Now we need to create a schema that describes how our data should look
In our server folder, we create a schema folder and file inside called schema.js.
first we require the main graphql file. 
const graphql = require('graphql') 
then we create our schema. Our schema will define the type of data, object types, relationship and how we want our data to interact and how to query them.
In creating our schema, we destructure graphql to obtain the graphql object data template
const {GraphQLObjectType} = graphql;

next we define our type

//when we have multiple types,and they have references to one another, unless we wrap those fields in a function, one typr might not necessarily know what another typr is.

In the field parameters, we need to specify the type of data that should be stored in the id. The type has to be destructured from grapghql for gragpql to be able to read it. if it is a string, it is destructured like this
const {GraphQLObjectType, GraphQLString} = graphql;



next we import the schema file in the app file and define it inside the middleware


this is what happens when a request is made
book(id: '2'){
  name
  genre
}
form it the request Made, it knows to look for a book query inside the root query, 
 then check the book query field inside the root query for how to handle the data. 
 it confirms that the object is is booktype
 from the args ppty it knows it is expecting the query to come with an id an id 
 it takes the id from the request and attach it to the args property in the resolve function
 the query fires the resolve function to run the code to find the book that is either stored in a sql database or no sql database


 Next we create our dummy data in an array of ojects just temporarily and install Lodash
 npm install lodash
to help us manipulate or find or change data inside our hard coded data in the array.

Inside our graphql middleware, we add the graphiql as a gui to test our route/request

so instead of our string id, we can use an id type in graphql called a graphqlid, we destructure it from graphql and changed the type of the id from string to GraphQLID

Next we create the schema for the authors and hardcode their data and define author query in the root query.

Every book has an author and every author has a collection of books.
we need to represent this relationship in graphql using the id 
first you add the author id to the books data, then you add the author property to the book type object

next to represent the list of books each author has written, we add the book property to the object authortype. The destructure grqphqllist from grapghql to be able to display list of books from same author.

next we define query to get all authors, all books, all authors and their books, all books and their authors in the root query

Next is to move our data to mongo database on the cloud using Atlas.
Atlas allows you to to host your database on mongodb without having to download mongo to your laptop

first we login to atlas and get the connection link, after which we install mongoose on our application locally.
mongoose lets us communicate easily with mongodb.
npm i mongoose --save

next we require mongoose in our app.js file
next we connect to atlas with the connection string gotten on the atlas site
then we set up a listener to log a message to the console once connection is succesfull

mongoose.connect('mongodb+srv://Cynthia:cynilo8891@cluster0-09ybn.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connection.on('open', () => {
  console.log('connected')
})

next we create our model and schema for each dataType that we will store on mongodb
graphql schema is defining our graph and the object-type on our graph while mongo/mongoose schema define the data we will store in our database

first we create a folder called models then in it we create 2 files, one for books.js and another for author.js
then in the book.js, wee require mongoose, then get the mongoose schema ppty and store in a variable

then we create mongoose schema for our book data that will be stored in the db and also create a model with collection and schema as parameters in the book .js file
then we create mongoose schema for our author data that will be stored in the db and also create a model with collection and schema as parameters in the author.js file

then we delete our dummy data and comment out our resolve block code that fetches the dummy data.

then we require the files in our model folder into the schema file.

Mutations in graphql is what allows us to change or create our data
so we define our mutation in the schema to be able to create data in our database

we need to resolve our data from our database on atlas, but currently there i'snt any data in there.

in this case, we would use mutation to create data and add it to our database.
In graphQl, we need to explicitly define our mutaions to say what data can be edited, deleted, created, etc

To define mutation,

first in our schema file, we set  const mutation variable to a new grapgqlobj.
inside the object we set our name ppty and fields property.

the field property is where we can add, delete, change, update, etc.
All CRUD operations are defined in the field object.

An example of how CRUD operation can be defined in the field object
fields: {
  //crud operation to create/add new author object
  addAuthor: { 
    //what type should your data take(this is also defined as a new graphql object in the schema)
    type: AuthorType
    args contains the ppty/data and the datatype of it value that we should expect from the user each time they want to create add a new author
    args: {
      name: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      <!-- in the resolve object, we take the argument provided by the user and make a new instance of the author -->
      resolve(parent, args){
        <!-- this line cretes a new author data object instance with the arg parameters and stoes it in the Author collection we created in the mongoose model -->
        let author = new Author({
          name: args.name,
          age: args.age
        })
        // saves created data to database
        return author.save()
    }
  }
}

after which you export mutation as a ppty of the graphql schema


In order to prevent saving incomplete author or books details to the database,
we destructure the nonNull ppty from graphql (GraphQLNonNull) and then we apply this ppty to the mutation where the args ppty is defined.


Next we will build a frontend with react to communicate with our backend. We will also use apollo as an interface for our react to communicate with our graphQL. GraphQL is not written in javascript so it is cannot communicate with graphQL except through Apollo.

Apollo will help us create a query and bind that query to our component so that when the component renders in the browser, behind the scenes, apollo is handling that query to the server and returning that information so that we can show it inside the component

now for the front end
we first install create react app on the directory
npm install create-react-app --save

next 
create-react-app client in the root folder, this creates a client folder and stores all the needed files and dependencies there.

cd into the client folder and run this command, npm start to render the react page on the browser
then remove all unwanted files in the client generated automatically 
style the body in the index.js file then to build and render your first component,

create a component folder, crete a file and call it the name of your first component with a capital letter and build
import you component into the app folder and view output on browser

next we setup Appollo client on our front-end so that we can start interating with our graphQL server, making queries, recieving data and displaying the data on the front end

In order to work with GraphQl on the front-end and make graphQL query our server from the frontend, we would need a graphQL client (Apollo). we can use a front-end library like axios or jqery to help us make request when we make http request to restful api.
But when it comes to graphQL, we would need to use a graphQl client Appolo to make request from the front-end to the graphQL server.

So for our frontend react app, we would still create queries much like we did previously in graphicle and then feeding then through the garphQl client appolo which will send the request to the sever, the server will then respond, and fee the data back to applo which will oass it back into our react application.

our client is the thing that is incharge for the passage of data from frontend to the back end
install client apollo from here https://www.apollographql.com/docs/react/essentials/get-started/

npm install apollo-boost react-apollo graphql

next import appolo client into ur app.js file
import ApolloClient from "apollo-boost";

now setup apollo client
/ apollo client setup
const client = new ApolloClient({
//  this allows appolo to know tha it will be making a request to a graphql server
  uri:'http://localhost:4000/graphql'
})

next we import into app.js file, apollo-provider from react-apollo
react-apollo is what binds apollo to react, It helps react undertsand what ot is doing and we need the apollo provider to wrap our application and inject whatever adat wwe recieve from our server into our application.

Apollo injcets data from the server into our application using Apolloprovider, To use the Apollo-provider, we wrap our code in the return statement with the Apollo provider tag.

<!-- Making Queries and binding data -->
How to make queries in a component;
first we need to construct the query 
then we bind the query to the components,  so that the component collects all the data that comes back from the query 
GraphQl query language is not javascript so we need another language to help parse it into Javascript, 
in this case, we import gql from apollo-apollo-boost.

Next we define our query
Next we bind our query to the component so that we can acces the data that comes from the query by
first importing graphql from react-apollo
then bing the component to query during export

next we install cors in our express graphql server - this causes graphql to allows request from other service.
then we require cors in the app.js file in the server and set it up for use 
<!-- rendering data in a compone -->
the we go back to our client and if we pass th prop function into our book list component and
if we console.log the props of the booklist component, it will output its result twice
The react component renders to the browser
The first data property shown in the console is from our graphql query, at the point, there is no data response from the server and loading is true

the second data ppty occurs when response has been gooten from the server, it populates the gotten data (books) into the data property of the prop . Loading is also false.


what happens is when the props is updated with  data, the react re-renders the components, then we can match the component with the data. Now when we recieve the books data, we can then output it to the browser.


next we create a function in the component that will control the output of the book data to the screen in the component
this function is wrotten inside the component before the return statement and called inside the return statement

<!-- New book component -->
make a query to get the authors and attach them to the form field

first we create the add book component, inside we return our form

then we nest the component in app.js file.




