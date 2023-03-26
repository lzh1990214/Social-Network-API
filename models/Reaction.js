// const { Schema } = require('mongoose');
// const handleError = (err) => console.error(err);

// const reactionSchema = new Schema(
//     {
//         reactionId: {
//             type: Schema.Types.ObjectId,
//             default: () => new mongoose.Types.ObjectId()
//         },
//         reactionBody: {
//             type: String,
//             required: true,
//             maxlength: 280
//         },
//         created_at: {
//             type: Date,
//             // Format the timestamp to a string representation
//             default: Date.now
//         },
//         username: {
//             type: String,
//             required: true
//         }
//     },
//     {
//         toJSON: {
//             getters: true,
//             // virtuals: true,
//         },
//         id: false,
//     }
// );

// // Define a getter for the created_at field
// reactionSchema
//     .path('created_at')
//     .get(function (created_at) {
//         // Format the timestamp to a string representation
//         return created_at.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     });


// module.exports = reactionSchema;

