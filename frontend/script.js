// This is the beginning of the script.js file
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

window.onload = () => {
    const navDiv = document.getElementById("nav-btn")
    const generateButton = document.querySelector("#nav-btn2")
    
    
    if(token) {
        navDiv.innerHTML = `
        <a href = "./index.html" id = "log-out">LOG OUT</a>
        `
        const logOut = document.getElementById("log-out")
        logOut.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        })
        
        const generateButton = document.querySelector("#nav-btn2")
        generateButton.addEventListener("click", () => {
            window.location.href = "./dashboard 2/dashboard2.html"
        })
    }

}