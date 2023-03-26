const { Schema, model } = require('mongoose');
const handleError = (err) => console.error(err);

// https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegex
      // validate: {
      //   validator: function (email) {
      //     return emailRegex.test(email);
      //   },
      //   message: 'Please enter a valid email address.'
      // }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    }
  }
);

// Create a virtual property `fullName` that gets and sets the user's friend count
userSchema
  .virtual('friendCount')
  // Get the length of the friends array
  .get(function () {
    return this.friends.length;
  });

// Initialize the User model
const User = model('User', userSchema);

// User.create(
//   {
//     username: "johndoe",
//     email: "johndoe@gmail.com"
//   },
//   (err) => (err ? handleError(err) : console.log('Created new document'))
// );


module.exports = User;
