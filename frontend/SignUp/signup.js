const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("cpwd");
const submitForm = document.querySelector("#sign-up-form");
const signUpUser = document.getElementById("btn");

const url = "https://qr-gen-api.vercel.app/api/users/register";

submitForm.addEventListener("submit", (e) => {
	e.preventDefault();
	if (passwordConfirmInput.value !== passwordInput.value) {
		alert("Passwords do not match");
		return;
	}
	signUpUser.innerHTML = "Signing up...";
	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: nameInput.value,
			email: emailInput.value,
			password: passwordInput.value,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data.user);
			if (data.message === "User created") {
				signUpUser.innerHTML = "Sign up successful";
				localStorage.setItem("token", data.token);
				localStorage.setItem("user", JSON.stringify(data.user));
				setTimeout(() => {
					window.location.href = "../dashboard1/dashboard1.html";
				}, 1500);
			} else if (data.message === "Email Already Exists") {
				alert("Email already exists");
				signUpUser.innerHTML = "Sign Up";
        emailInput.focus();
			}
		})
		.catch((err) => console.log(err));
});
