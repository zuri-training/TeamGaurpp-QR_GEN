const userEmail = document.getElementById("user_email");
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const qrCodesContainer = document.querySelector("#qrcodes_container");
const createQr = document.querySelector("#create_qrcode");

createQr.addEventListener("click", () => {
	window.location.href = "../dashboard 2/dashboard2.html";
});

window.onload = () => {
	let qrCodes = "";
	userEmail.innerHTML = user.email;
	const url = "https://qr-gen-api.vercel.app/api/qr_gen";

	fetch(url, {
		method: "GET",
		headers: { Authorization: `Bearer ${token}` },
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.allQrCodes.length > 0) {
				for (let qrCode of data.allQrCodes) {
					qrCodes += `
                  <div class="qrcode" id=${qrCode._id}>
                      <img src=${qrCode.qrCode} alt="qr code" width = "150px" />
                      <p>${qrCode.title ? qrCode.title : "Untitled"}</p>
                      <p>${Date(qrCode.createdAt).slice(0, 15)}</p>
                  </div>
              `;
				}
				qrCodesContainer.innerHTML = qrCodes;
			}
		})
		.finally(() => {
			const qrCodesDivs = document.querySelectorAll(".qrcode");

			qrCodesDivs.forEach((qrCodeDiv) => {
				qrCodeDiv.addEventListener("click", () => {
					const qrCodeId = qrCodeDiv.getAttribute("id");
					localStorage.setItem("currentQrCode", qrCodeId);
					window.location.href = "../dashboard5/dashboard5.html";
					console.log(qrCodeId);
				});
			});
		})
		.catch((error) => console.error(error));
};

const logOut = document.getElementById("log-out");
logOut.addEventListener("click", () => {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
	window.location.href = "../index.html";
});
