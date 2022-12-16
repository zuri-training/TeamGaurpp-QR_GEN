const express = require("express");
const controller = require("../controller/qrController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.post("/", verifyToken, controller.generateCode);
router.get("/", verifyToken, controller.getAllQrCodes);
router.get ("/:id", verifyToken, controller.getAQrCode)
router.delete("/:id", verifyToken, controller.deleteQrCode)

module.exports = router;
