const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');
const handleError = (err) => console.error(err);

// Create Reaction Schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        created_at: {
            type: Date,
            // set current date as the timestamp for the default value.
            default: Date.now,
            get: (timestamp) => formatDate(timestamp)
        },
        username: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        },
        // Note: the _id field is still present in the database and can be used to query and update documents.
        id: false,
    }
);

// Define a getter for the created_at field
// reactionSchema
//     .path('created_at')
//     .get(function (created_at) {
//         // Format the timestamp to a string representation
//         return formatDate(created_at);
//     });


// Create thought Schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 128
        },
        created_at: {
            type: Date,
            // Format the timestamp to a string representation
            default: Date.now,
            get: (timestamp) => formatDate(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        // Set option to use getters when converting document to JSON
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

// Define a getter for the created_at field
// thoughtSchema
//     .path('created_at')
//     .get(function (created_at) {
//         // Format the timestamp to a string representation
//         return created_at.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     });

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

// Initialize the Thought model
const Thought = model('Thought', thoughtSchema);

// Thought.create(
//     {
//         thoughtText: "Here's a cool thought...",
//         username: "zhihaoli",
//         userId: "5edff358a0fcb779aa7b118b",
//         reactions: [
//             {
//                 "reactionBody": "Here's a cool reaction...",
//                 "username": "zhihaoli",
//                 "userId": "5edff358a0fcb779aa7b118b"
//             }
//         ]
//     },
//     (err) => (err ? handleError(err) : console.log('Created new document'))
// );

module.exports = Thought;