const ham = document.querySelector("#menu");
const nav = document.querySelector("nav");
ham.addEventListener("click", () => {
    // Toggle hamburger
    ham.classList.toggle("show");
    nav.classList.toggle("show");
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
