const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
	try {
		const bearerHeaders = req.headers.authorization;
		if (!bearerHeaders) {
			return res.status(401).json({ message: "Auth Header Required" });
		}
		const splittedHeaders = bearerHeaders.split(" ");
		if (splittedHeaders[0] !== "Bearer") {
			return res
				.status(401)
				.json({ message: "Auth format is Bearer <token>" });
		}
		const bearerToken = splittedHeaders[1];
		const decodedToken = jwt.verify(bearerToken, process.env.JWT_SECRET);
		if (!decodedToken) {
			return res.status(401).json({ message: "Invalid Token" });
		}
		req.user = decodedToken;
		next();
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please contact Admin" });
	}
};
