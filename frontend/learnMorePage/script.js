const token = localStorage.getItem("token");
const generateCode = document.querySelector(".get")
const button = document.querySelector(".active")

generateCode.addEventListener("click", () => {
    if (token) {
        window.location.href = "../dashboard1/dashboard1.html"
    } else {
        window.location.href = "../SignUp/signup.html"
    }
})

button.addEventListener("click", () => {
    window.location.href = "../dashboard 3/dashboard3.html"
})
