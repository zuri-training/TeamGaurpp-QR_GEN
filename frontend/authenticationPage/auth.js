const submitForm = document.querySelector("#form");
const codeInput = document.getElementById("code");
const resendCode = document.getElementById("resend");
const user = document.getElementById("user-email");
const otp = localStorage.getItem("otp");
const userEmail = localStorage.getItem("userEmail");
const url = "https://qr-gen-api.vercel.app/api/users/forgotPassword";

window.onload = () => {
	const email = userEmail.replace(userEmail.split("@")[0].slice(-5), "*****");
	user.innerHTML = email;

	let timeLeft = 60;
	const downloadTimer = setInterval(() => {
		if (timeLeft <= 0) {
			clearInterval(downloadTimer);
			resendCode.innerHTML = "click here";
			resendCode.style.cursor = "pointer";
		} else {
			resendCode.innerHTML = timeLeft + " secs";
		}
		timeLeft -= 1;
	}, 1000);
	resendCode.addEventListener("click", () => {
		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: userEmail
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(userEmail);
				console.log(data);
				if (data.message === "Reset password link sent to mail") {
					localStorage.setItem("otp", data.otp);
					window.location.reload();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});
};

submitForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const code = codeInput.value;

	if (code.length !== 6 || code !== otp) {
		alert("Invalid code");
		codeInput.focus();
	} else {
		window.location.href = "../passwordReset/reset.html";
	}
});
