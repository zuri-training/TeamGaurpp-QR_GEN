const backArrow = document.getElementById('previous')
const userEmail = document.getElementById("user_email");
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const submitForm = document.querySelector("#qr-form");

const url = "http://qr-gen.eu-4.evennode.com/api/qr_gen/"


window.onload = () => {
    userEmail.innerHTML = user.email;

    backArrow.setAttribute('href', document.referrer);

    backArrow.onclick = () => {
        history.back();
        return false;
    }
}

submitForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const content = contentInput.value;

    if(content.length > 0) {
        
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title: titleInput.value,
                content: contentInput.value
            })
        })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("currentQrCode", data.code._id);
            window.location.href = "../dashboard5/dashboard5.html"
        })
    }
})