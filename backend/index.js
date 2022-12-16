const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./database/db");
const userRoutes = require("./routes/userRoutes");
const qrRoutes = require("./routes/qrRoutes");
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
	res.status(200).json({ message: "Qr_Gen API is Running" });
});
app.use("/api/users", userRoutes);
app.use("/api/qr_gen", qrRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
