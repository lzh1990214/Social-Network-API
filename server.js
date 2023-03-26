const express = require('express');
const db = require('./config/connection');
// const routes = require('./routes');
// Require models
const { User, Thought } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);

db.once('open', () => {
  const reaction = db.collection('reactions');

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});




