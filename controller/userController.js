const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

exports.registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const checkEmail = await User.findOne({ email: email });
		if (checkEmail) {
			return res.status(400).json({ message: "Email Already Exists" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
		});
		const payload = {
			id: newUser._id,
			email: newUser.email,
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "24h",
		});
		return res
			.status(201)
			.json({ message: "User created", user: newUser, token: token });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: err.message});
	}
};

exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const findUser = await User.findOne({ email: email });
		if (!findUser) {
			return res.status(404).json({ message: "Invalid Email Address" });
		}
		const validPassword = await bcrypt.compare(password, findUser.password);
		if (!validPassword) {
			return res.status(401).json({ message: "Invalid Password" });
		}
		const payload = {
			id: findUser._id,
			email: findUser.email,
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "24h",
		});
		return res
			.status(200)
			.json({ message: "User Logged In", user: findUser, token: token });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please contact Admin" });
	}
};

exports.forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const findUser = await User.findOne({ email: email });
		if (!findUser) {
			return res.status(404).json({ message: "Invalid Email Address" });
		}
		const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
		sendEmail(
			findUser.email,
			"Reset Password",
			`<h1>Enter the otp below to reset your password</h1>
			 <h2>${otp}</h2>`
		);
		return res
			.status(200)
			.json({ message: "Reset password link sent to mail", otp });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please contact Admin" });
	}
};

exports.resetPassword = async (req, res) => {
	try {
		const { newPassword, confirmPassword } = req.body;
		const { email } = req.query;
		if (newPassword !== confirmPassword) {
			return res.status(401).json({ message: "Passwords do not match" });
		}
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		await User.findOneAndUpdate({ email }, { password: hashedPassword });
		return res
			.status(200)
			.json({ message: "Password Updated Successfully" });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please contact Admin" });
	}
};

exports.changePassword = async (req, res) => {
	try {
		const { oldPassword, newPassword, confirmPassword } = req.body;
		const { id } = req.user;
		const findUser = await User.findOne({ id });
		if (!findUser) {
			return res.status(404).json({ message: "Invalid Email Address" });
		}
		const validPassword = await bcrypt.compare(
			oldPassword,
			findUser.password
		);
		if (!validPassword) {
			return res.status(401).json({ message: "Invalid Old Password" });
		}
		if (newPassword !== confirmPassword) {
			return res.status(401).json({ message: "Passwords do not match" });
		}
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		await User.findOneAndUpdate({ id }, { password: hashedPassword });
		return res
			.status(200)
			.json({ message: "Password Updated Successfully" });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please contact Admin" });
	}
};
