const router = require("express").Router();
// import all functions from "thought-contoller.js" file
const thoughtController = require("../../controllers/thought-contoller");
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = thoughtController;

// /api/thoughts
// get all thoughts
router.route("/").get(getAllThoughts);
// create a new thought
router.route("/").post(createThought);

// /api/thoughts/:id
// get one thought by id
router.route("/:id").get(getThoughtById);
// update a thought by id
router.route("/:id").put(updateThought);
// delete a thought by id
router.route("/:id").delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
// create a reaction stored in a single thought's reactions array field
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
// pull and remove a reaction by the reaction's reactionId value
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;