const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const handleError = (err) => console.error(err);

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
            default: Date.now
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
thoughtSchema
    .path('created_at')
    .get(function (created_at) {
        // Format the timestamp to a string representation
        return created_at.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    });

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

// Initialize the Thought model
const Thought = model('Thought', thoughtSchema);

Thought.create(
    {
        thoughtText: "Here's a cool thought...",
        username: "zhihaoli",
        userId: "5edff358a0fcb779aa7b118b"
    },
    (err) => (err ? handleError(err) : console.log('Created new document'))
);

module.exports = Thought;