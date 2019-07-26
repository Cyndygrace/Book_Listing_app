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