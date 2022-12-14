let userEmail = document.getElementById('user_email')
const user = JSON.parse(localStorage.getItem("user"))

userEmail.innerHTML = user.email;