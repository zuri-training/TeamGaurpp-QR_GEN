const qrCodeId = localStorage.getItem("currentQrCode")
const qrCodeContainer = document.getElementById("qr-code-container")
const qrName = document.getElementById("qr-name")
const createdTime = document.getElementById("qr-timestamp")
const downloadContainer = document.getElementById("download")
const userEmail = document.getElementById("user_email");
const deleteQrCode = document.getElementById("delete-qr-code");
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
const url = "https://qr-gen-api.vercel.app/api/qr_gen/"



window.onload = () => {
    userEmail.innerHTML = user.email;

    fetch(url + qrCodeId, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`},
    })
    .then(response => response.json())
    .then(data => {
        qrCodeContainer.innerHTML = `
            <img src=${data.findQrCode.qrCode} alt="qr" id="qr-image" />
        `
        downloadContainer.innerHTML = `
            <a href = ${data.findQrCode.qrCode} download><button>Download</button></a>
            <a href="whatsapp://send?text=${data.findQrCode.qrCode}"   data-action="share/whatsapp/share"  
            target="_blank" ><button>Export Information</button></a>
        `
        qrName.innerHTML = data.findQrCode.title;
        createdTime.innerHTML = Date(data.findQrCode.createdAt).slice(0, 15);
    })

    deleteQrCode.addEventListener("click", () => {
        fetch(url + qrCodeId, {
            method: "DELETE",
            headers: {Authorization: `Bearer ${token}`},
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Code deleted") {
                window.location.href = "../dashboard1/dashboard1.html"
            }
        })
    })
}

