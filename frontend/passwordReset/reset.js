const submitForm = document.querySelector("#form");
const showPassword = document.querySelector("#show-password");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const userEmail = localStorage.getItem("userEmail");

const url = "https://qr-gen-api.vercel.app/api/users/resetPassword?email=";

showPassword.addEventListener("click", () => {
	if (password.type === "password") {
		password.type = "text";
	} else {
		password.type = "password";
	}
	if (confirmPassword.type === "password") {
		confirmPassword.type = "text";
	} else {
		confirmPassword.type = "password";
	}
});

submitForm.addEventListener("submit", (e) => {
	e.preventDefault();

	if (password.value !== confirmPassword.value) {
		alert("Passwords do not match");
		password.focus();
	}

	fetch(url + userEmail, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			newPassword: password.value,
			confirmPassword: confirmPassword.value,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.message === "Password updated successfully") {
				window.location.href =
					"../success_screen_password/success.html";
			}
		})
		.catch((err) => {
			console.log(err);
		});
});
