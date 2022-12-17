const backArrow = document.getElementById("previous");
const userEmail = document.getElementById("user_email");
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const submitForm = document.querySelector("#qr-form");
const finishQrCreate = document.getElementById("finish");

const url = "https://qr-gen-api.vercel.app/api/qr_gen";

window.onload = () => {
	userEmail.innerHTML = user.email;

	backArrow.setAttribute("href", document.referrer);

	backArrow.onclick = () => {
		history.back();
		return false;
	};
};

submitForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const content = contentInput.value;
	finishQrCreate.innerHTML = "Generating QR Code...";
	if (content.length > 0) {
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				title: titleInput.value,
				content: contentInput.value,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.message === "Code generated") {
					localStorage.setItem("currentQrCode", data.code._id);
					window.location.href = "../dashboard5/dashboard5.html";
				} else if (data.message === "Code already exists") {
					alert("Code already exists");
                    finishQrCreate.innerHTML = `Finish <img src="image/arrowright.png" alt="arrowright">`;
                    contentInput.focus();
				}
			});
	}
});
