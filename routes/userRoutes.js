const express = require("express");
const controller = require("../controller/userController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);
router.post("/forgotPassword", controller.forgotPassword);
router.patch("/resetPassword", controller.resetPassword);
router.patch("/changePassword", verifyToken, controller.changePassword);

module.exports = router;
