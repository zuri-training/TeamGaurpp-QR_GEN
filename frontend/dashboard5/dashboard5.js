const qrCodeId = localStorage.getItem("currentQrCode")
const qrCodeContainer = document.getElementById("qr-code-container")
const qrName = document.getElementById("qr-name")
const createdTime = document.getElementById("qr-timestamp")
const userEmail = document.getElementById("user_email");
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
const url = "http://qr-gen.eu-4.evennode.com/api/qr_gen/"



window.onload = () => {
    userEmail.innerHTML = user.email;

    fetch(url + qrCodeId, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`},
    })
    .then(response => response.json())
    .then(data => {
        qrCodeContainer.innerHTML = `
            <img src=${data.findQrCode.qrCode} alt="qr" id="qr-image">
        `
        qrName.innerHTML = data.findQrCode.title;
        createdTime.innerHTML = Date(data.findQrCode.createdAt).slice(0, 15);
    })
}
