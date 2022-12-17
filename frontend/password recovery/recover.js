const submitForm = document.querySelector("#form");
const emailInput = document.getElementById("email");
const sendEmail = document.getElementById("submit");
const cancel = document.querySelector("#cancel");

const url = "https://qr-gen-api.vercel.app/api/users/forgotPassword";

submitForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const email = emailInput.value;

	if (email) {
		sendEmail.value = "Sending...";
		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.message === "Reset password link sent to mail") {
					localStorage.setItem("otp", data.otp);
					localStorage.setItem("userEmail", email);
					window.location.href = "../authenticationPage/auth.html";
				} else if (data.message === "Invalid Email Address") {
					alert("Invalid Email Address");
					emailInput.focus();
				}
			})
			.catch((err) => console.log(err));
	}
});

cancel.addEventListener("click", (e) => {
    e.preventDefault();
	window.location.href = "../index.html";
});