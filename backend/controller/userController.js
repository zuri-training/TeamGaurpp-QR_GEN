const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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
			.json({ message: "An Error Occurred, Please contact Admin" });
	}
};

exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const findUser = await User.findOne({ email: email });
		if (!findUser) {
			return res.status(404).json({ message: "User Not Found" });
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
