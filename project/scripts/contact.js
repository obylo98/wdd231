const hamburgerMenu = document.querySelector(".hamburger-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const closeButton = document.querySelector(".close-btn");

hamburgerMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
});

closeButton.addEventListener("click", () => {
  mobileMenu.classList.remove("show");
});

// Capture the current timestamp
document.getElementById("timestamp").value = new Date().toLocaleString();

const openModalButtons = document.querySelectorAll(".open-button");
const closeModalButtons = document.querySelectorAll(".close-button");

// Function to open the modal
openModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        modal.showModal();
    });
});

// Function to close the modal
closeModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});
