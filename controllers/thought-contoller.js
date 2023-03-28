const { User, Thought } = require("../models");

const thoughtController = {
    // function to get all thoughts from the database
    getAllThoughts(req, res) {
        Thought.find()
            .populate({
                path: "reactions",
                // use "select" to exclude "__v" field from thought document
                select: "-__v",
            })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },

    // function to get one thought by id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(dbThoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },

    // function to create a thought
    createThought(req, res) {
        Thought.create(req.body)
            // .then((dbThoughtData) => res.json(dbThoughtData))
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    // $push operator to push the created _id of the thought to the thoughts array in the associated User document
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },

    // function to update a thought data by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true,
            })
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(dbThoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },

    // function to delete a thought by id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    // delete thought id from the thoughts field of the associated User document
                    : User.findOneAndUpdate(
                        { thoughts: req.params.id },
                        { $pull: { thoughts: req.params.id } },
                        { new: true }
                    )
            )
            .then(() => {
                res.json({ message: "Thought and related reactions have been deleted!" });
            })
            .catch((err) => res.status(500).json(err));
    },

    // function to add a reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            // "$addToSet" is a update operation that adds a new reaction value to the reactions array of the selected Thought document.
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(dbThoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },

    // function to delete a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            // "$pull" is a update operation that removes a reaction from the reactions array of the selected Thought document.
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(dbThoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = thoughtController;