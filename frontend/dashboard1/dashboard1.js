const userEmail = document.getElementById("user_email");
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const qrCodesContainer = document.querySelector("#qrcodes_container");



window.onload = () => {
    let qrCodes  = ""
    userEmail.innerHTML = user.email;
    const url = "http://qr-gen.eu-4.evennode.com/api/qr_gen/";
    
    fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.allQrCodes)
        if(data.allQrCodes.length > 0) {
            for (let qrCode of data.allQrCodes) {
                qrCodes += `
                <div class="qrcode" id=${qrCode._id}>
                    <img src=${qrCode.qrCode} alt="qr code" width = "150px" />
                    <p>${qrCode.title ? qrCode.title : "Untitled"}</p>
                    <p>${Date((qrCode.createdAt)).slice(0,15)}</p>
                </div>
            ` 
            }
        }
        qrCodesContainer.innerHTML = qrCodes;

    })
      .catch((error) => console.log(error));

  const qrCodesDivs = document.querySelectorAll('.qrcode');

  qrCodesDivs.forEach((qrCodeDiv) => {
    qrCodeDiv.addEventListener('click', () => {
        const qrCodeId = qrCodeDiv.getAttribute("id");
        console.log(qrCodeId)
    })
  })
}

