const express = require("express");
const validate = require("../../middlewares/validate");
// const userValidation = require("../../validations/user.validation");
const videoController = require("../../controllers/video.controller");
// const auth = require("../../middlewares/auth");

const router = express.Router();
// const validateUser = validate(userValidation.getUser);

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement a route definition for `/v1/users/:userId`
router.post("/", videoController.createVideo);
router.get("/", videoController.getVideos);
router.get("/:videoId", videoController.getVideoById);
router.patch("/:videoId/votes", videoController.updateVideoVotes);
router.patch("/:videoId/views", videoController.updateVideoViews);


// const router = express.Router();




// router.put(
//   "/:userId",
//   auth,
//   validate(userValidation.setAddress),
//   userController.setAddress
// );

module.exports = router;
