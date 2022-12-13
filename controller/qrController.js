const qrCode = require("qrcode");
const Code = require("../models/qrCode");
const User = require("../models/User.js");

exports.generateCode = async (req, res) => {
	try {
		const { text } = req.body;
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}
		const findQrCode = await Code.findOne({ text });
		if (findQrCode) {
			return res.status(400).json({
				message: "Code already exists",
			});
		}
		const generateCode = await qrCode.toString(text, { type: "terminal" });
		const imgCode = await qrCode.toDataURL(text);
		const code = await Code.create({
			userId: req.user.id,
			text: text,
			qrCode: imgCode,
		});

		console.log(generateCode);
		return res.status(200).json({ message: "Code generated", code });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An error occurred, please contact Admin" });
	}
};
