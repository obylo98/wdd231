const hamburgerMenu = document.querySelector(".hamburger-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const closeButton = document.querySelector(".close-btn");

hamburgerMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
});

closeButton.addEventListener("click", () => {
  mobileMenu.classList.remove("show");
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
document.querySelector(
  "#lastmodified"
).innerHTML = `Last modified: ${document.lastModified}`;
