const qrCode = require("qrcode");
const Code = require("../models/qrCode");
const User = require("../models/User.js");

exports.generateCode = async (req, res) => {
	try {
		const { title, content } = req.body;
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
			title: title,
			content: content,
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

exports.getAllQrCodes = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}
		const allQrCodes = await Code.find({ userId: user._id });
		return res.status(200).json({ message: "Code returned", allQrCodes });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An error occurred, please contact Admin" });
	}
};

exports.getAQrCode = async (req, res) => {
	try {
		const { id } = req.params;
		const findQrCode = await Code.findById(id);
		if (!findQrCode) {
			return res.status(404).json({
				message: "Code not found",
			});
		}
		if (findQrCode.userId.toJSON() !== req.user.id) {
			return res.status(403).json({
				message: "Unauthorized",
			});
		}
		return res.status(200).json({ message: "QRCode Found", findQrCode });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An error occurred, please contact Admin" });
	}
};

exports.deleteQrCode = async (req, res) => {
	try {
		const { id } = req.params;
		const findQrCode = await Code.findById(id);
		if (!findQrCode) {
			return res.status(404).json({
				message: "Code not found",
			});
		}
		if (findQrCode.userId.toJSON() !== req.user.id) {
			return res.status(403).json({
				message: "Unauthorized",
			});
		}
		await Code.findByIdAndDelete(id);
		return res.status(200).json({ message: "Code deleted" });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An error occurred, please contact Admin" });
	}
};
