const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("cpwd");
const submitForm = document.querySelector("#sign-up-form");

const url = "http://qr-gen.eu-4.evennode.com/api/users/register";

submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if(passwordConfirmInput.value !== passwordInput.value) {
    alert("Passwords do not match");
    return;
  }
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      // passwordConfirm: passwordConfirmInput.value
    })
  })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.user)
      if(data.message === "User created"){
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setTimeout(() => {
            window.location.href = "../dashboard1/dashboard1.html";
        }, 2000)
      }
    })
    .catch((err) => console.log(err));
});
