const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// function that sends email
const sendEmail = async (email, subject, html) => {
	try {
		// reusable transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		transporter.sendMail({
			from: process.env.USER, //sender email address
			to: email, //Receiver(s) email address
			subject: subject, //subject of the mail
			html: html, //html body of  the mail
		});

		console.log("Message successfully sent."); //confirm message sent
	} catch (error) {
		console.log(error, "email not sent");
	}
};

module.exports = sendEmail;
