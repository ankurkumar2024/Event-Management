const express = require('express');
const news = require('./src/routes/events');
const users = require('./src/routes/users');
const { createMongoDBConnection } = require('./src/utils/mongodb');
const app = express();
const port = 3000;
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', users);
app.use('/events', news);

app.listen(port, async (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }
  await createMongoDBConnection();
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
