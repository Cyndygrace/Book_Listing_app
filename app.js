const express = require('express');
//provides a simple way to create an express server to run the graphql api
const graphqlHTTP = require('express-graphql');
const schema = require('./Schema/schema');

//setup our express app
const app = express();

//setup express-graphql middleware route to handle graphql requests
app.use('graphql', graphqlHTTP({
schema:schema
}))

app.listen(4000, () =>
  console.log('now listening for request on port 4000...')
);

