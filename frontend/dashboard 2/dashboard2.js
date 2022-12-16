const backArrow = document.getElementById('previous')
const userEmail = document.getElementById("user_email");
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const clickables = document.querySelectorAll(".is-working")



window.onload = () => {
    userEmail.innerHTML = user.email;

    backArrow.setAttribute('href', document.referrer);

    backArrow.onclick = function() {
        history.back();
        return false;
    }

    clickables.forEach((clickable) => clickable.onclick = () => {
        window.location.href = "../dashboard 3/dashboard3.html"
    })


}