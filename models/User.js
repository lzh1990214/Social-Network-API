const { Schema, model } = require('mongoose');

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
      validate: {
        validator: function (email) {
          return emailRegex.test(email);
        },
        message: props => `${props.value} is not a valid email address! Please enter a valid email.`
      }
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
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('friendCount')
  // Get the length of the friends array
  .get(function () {
    return this.friends.length;
  })
  .set(this.friends.length);

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
