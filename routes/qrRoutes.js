const express = require("express");
const controller = require("../controller/qrController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.post("/", verifyToken, controller.generateCode);

module.exports = router;
