// const connection = require('../config/connection');
// const { User, Thought } = require('../models');
// const { userData, thoughtData, reactionData } = require('./data');

// connection.on('error', (err) => err);

// connection.once('open', async () => {
//   console.log('connected');

//   const Reaction = db.collection('reactions');

//   // Drop existing users
//   await User.deleteMany();

//   // Drop existing thoughts
//   await Thought.deleteMany();

//   // Drop existing reactions
//   // await Reaction.deleteMany();

//   // Add userData to the collection and await the results
//   await User.collection.insertMany(userData);

//   await Thought.collection.insertMany(thoughtData);

//   // await Reaction.collection.insertMany(reactionData);

//   // Log out the seed data to indicate what should appear in the database
//   console.table(User);
//   console.table(Thought);
//   console.table(Reaction);

//   console.info('Seeding complete! 🌱');
//   process.exit(0);
// });
