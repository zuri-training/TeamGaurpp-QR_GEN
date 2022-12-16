const mongoose = require("mongoose");

const { Schema } = mongoose;

const qrCodeSchema = new Schema(
	{
		title: { type: String, required: true },
		userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
		qrCode: { type: String, required: true },
		content: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Code", qrCodeSchema);
