const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitForm = document.querySelector("#logIn");
const loginUser = document.getElementById("log-in");

const url = "https://qr-gen-api.vercel.app/api/users/login";

submitForm.addEventListener("submit", (event) => {
	event.preventDefault();
	loginUser.innerHTML = "Logging In...";

	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: emailInput.value,
			password: passwordInput.value,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data.user);
			if (data.message === "User Logged In") {
				localStorage.setItem("token", data.token);
				localStorage.setItem("user", JSON.stringify(data.user));
				setTimeout(() => {
					window.location.href = "../dashboard1/dashboard1.html";
				}, 1500);
			} else if (data.message === "Invalid Email Address") {
				alert("Please enter a valid email address");
				loginUser.innerHTML = "Log In";
			} else if (data.message === "Invalid Password") {
				alert("Please enter a valid password");
				loginUser.innerHTML = "Log In";
			}
		})
		.catch((err) => console.log(err));
});
