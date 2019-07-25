const express = require('express');

//setup our express app
const app = express();

app.listen(4000, () =>
  console.log('now listening for request on port 4000...')
);

