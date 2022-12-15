const backArrow = document.getElementById('previous')
const userEmail = document.getElementById("user_email");
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");



window.onload = () => {
    userEmail.innerHTML = user.email;

    backArrow.setAttribute('href', document.referrer);

    backArrow.onclick = function() {
        history.back();
        return false;
    }
}