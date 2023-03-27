const { User, Thought } = require("../models");

const userController = {
    // function to get all users from the database
    getAllUsers(req, res) {
        User.find()
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    // function to get one user by id
    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
            .populate({
                path: "thoughts",
                // use "select" to exclude "__v" field from thought document
                select: "-__v",
            })
            .populate({
                path: "friends",
                select: "-__v",
            })
            .select("-__v")
            .then((dbUserData) =>
                !dbUserData
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(dbUserData)
            )
            .catch((err) => res.status(500).json(err));
    },

    // function to create a user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    // function to update a user data by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true,
            })
            .then((dbUserData) =>
                !dbUserData
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(dbUserData)
            )
            .catch((err) => res.status(500).json(err));
    },

    // function to delete a user by id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((dbUserData) =>
                !dbUserData
                    ? res.status(404).json({ message: 'No user with that ID' })
                    // use "$in" operator to selects all documents where the _id field is included in the thoughts array of dbUserData.
                    // thus, all Thought documents that match the condition above will be deleted from the collection.
                    : Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
            )
            .then(() => {
                res.json({ message: "User and related thoughts have been deleted!" });
            })
            .catch((err) => res.status(500).json(err));
    },

    // function to add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            // "$addToSet" is a update operation that adds a new value "friendId" to the friends array of the selected User document.
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
            .then((dbUserData) =>
                !dbUserData
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(dbUserData)
            )
            .catch((err) => res.status(500).json(err));
    },

    // function to delete a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            // "$pull" is a update operation that removes "friendId" from the friends array of the selected User document.
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((dbUserData) =>
                !dbUserData
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(dbUserData)
            )
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = userController;