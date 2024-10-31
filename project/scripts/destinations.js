const hamburgerMenu = document.querySelector(".hamburger-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const closeButton = document.querySelector(".close-btn");

hamburgerMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
});

closeButton.addEventListener("click", () => {
  mobileMenu.classList.remove("show");
});
// JavaScript to control navigation buttons
document.addEventListener("DOMContentLoaded", function () {
    const foodTourContainer = document.getElementById("foodTourContainer");
    const navLeft = document.getElementById("navLeft");
    const navRight = document.getElementById("navRight");

    // Define scroll distance per click
    const scrollAmount = 200;

    // Scroll left on clicking left button
    navLeft.addEventListener("click", function () {
        foodTourContainer.scrollBy({
            top: 0,
            left: -scrollAmount,
            behavior: "smooth"
        });
    });

    // Scroll right on clicking right button
    navRight.addEventListener("click", function () {
        foodTourContainer.scrollBy({
            top: 0,
            left: scrollAmount,
            behavior: "smooth"
        });
    });
});
