const express = require('express');
//provides a simple way to create an express server to run the graphql api
const graphqlHTTP = require('express-graphql');
const schema = require('./Schema/schema');
const mongoose = require('mongoose');
const cors = require('cors')


// allow cross-origin request
app.use(cors());


//setup our express app
const app = express();

// connect to atlas db using mongoose
mongoose.connect('mongodb+srv://Cyndycodes:cynthia@cluster0-r9uq9.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
  console.log('Connected to database...')
}).catch(err => {
  console.log(err.message)
})
// const uri = 'mongodb+srv://Cyndycodes:cynthia@cluster0-r9uq9.mongodb.net/test?retryWrites=true&w=majority'
// mongoose.connect(uri,{useNewUrlParser:true}).then(()=>{
//   console.log('succesfully connected')
// }).catch(err=>{
//   console.log(err.message)
// })
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
