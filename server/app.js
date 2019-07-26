const express = require('express');
//provides a simple way to create an express server to run the graphql api
const graphqlHTTP = require('express-graphql');
const schema = require('./Schema/schema');
const mongoose = require('mongoose');


//setup our express app
const app = express();

// connect to mlab db using mongoose
mongoose.connect('mongodb+srv://Cynthia:cynilo8891@cluster0-09ybn.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connection.on('open', () => {
  console.log('connected to database')
})

//setup express-graphql middleware route to handle graphql requests
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () =>
  console.log('now listening for request on port 4000...')
);
