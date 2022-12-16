const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitForm = document.querySelector("#logIn");

const url = "https://qr-gen-api.vercel.app/api/users/login";

submitForm.addEventListener("submit", (event) => {
  event.preventDefault();

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
        }, 2000);
      }
    })
    .catch((err) => console.log(err));
});
