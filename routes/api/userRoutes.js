const router = require("express").Router();
// import all functions from "user-contoller.js" file
const userController = require("../../controllers/user-contoller");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = userController;

// /api/users
// get all users
router.route("/").get(getAllUsers);
// create a new user
router.route("/").post(createUser);

// /api/users/:id
// get a user by id
router.route("/:id").get(getUserById);
// update a user by id
router.route("/:id").put(updateUser);
// delete a user by id
router.route("/:id").delete(deleteUser);

// /api/users/:userId/friends/:friendId
// add a friend by friend's id
router.route("/:userId/friends/:friendId").post(addFriend);
// delete a friend by friend's id
router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;