const express = require("express");
const userController = require("../../controllers/users.controllers");

const router = express.Router();

router.route("/").post(userController.postFeed);
router.route("/").get(userController.getFeeds);
router.route("/:id").delete(userController.deleteFeed);
router.route("/:id").put(userController.updateFeed);

// router.route("/").get(userController.getUser);
// router.route("/:id").get(userController.getUserWidthId);
// router.route("/:id").put(userController.updateUser);
// router.route("/:id").delete(userController.deleteUser);
module.exports = router;
