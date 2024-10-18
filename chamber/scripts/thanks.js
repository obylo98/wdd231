const ham = document.querySelector("#menu");
const nav = document.querySelector("nav");
ham.addEventListener("click", () => {
  // Toggle hamburger
  ham.classList.toggle("show");
  nav.classList.toggle("show");
});

const urlParams = new URLSearchParams(window.location.search);
document.getElementById("firstName").textContent = urlParams.get("firstname");
document.getElementById("lastName").textContent = urlParams.get("lastname");
document.getElementById("email").textContent = urlParams.get("email");
document.getElementById("mobile").textContent = urlParams.get("mobile");
document.getElementById("business").textContent = urlParams.get("business");
document.getElementById("timestamp").textContent = urlParams.get("timestamp");

const date = new Date(); // Create a Date object
document.querySelector("#year").innerHTML = date.getFullYear();
document.querySelector("#lastmodified").innerHTML = `Last modified: ${document.lastModified}`;
