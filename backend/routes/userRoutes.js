const express = require("express");
const controller = require("../controller/userController")
const router = express.Router();

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);

module.exports = router;
