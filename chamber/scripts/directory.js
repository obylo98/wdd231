const cards = document.querySelector("#bussiness");  
const ham = document.querySelector("#menu");
const nav = document.querySelector("nav");
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

// Responsive ham and nav
ham.addEventListener("click", () => {
  ham.classList.toggle("show");
  nav.classList.toggle("show");
});

// Grid/list toggle
gridbutton.addEventListener("click", () => {
  cards.classList.add("grid");
  cards.classList.remove("list");
});

listbutton.addEventListener("click", () => {
  cards.classList.add("list");
  cards.classList.remove("grid");
});

// Instantiate date object
const date = new Date();

// Dynamically inject date into the document
document.querySelector("#year").innerHTML = date.getFullYear();
document.querySelector("#lastmodified").innerHTML = `Last modified: ${document.lastModified}`;

const url = "./data/members.json";

async function getMemberData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.table(data);
    cardsCompanies(data);  // Use the correct function name here
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

const cardsCompanies = (members) => {
  members.forEach((member) => {
    // Create a new section element for each company
    let card = document.createElement("section");

    // Fill the card with company data using template literals
    card.innerHTML = `
      <h3>${member.name}</h3>
      <div class="company-details">
        <div class="company-info">
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
          <p><strong>Membership Level:</strong> ${member.membershipLevel === 1 ? 'Member' : member.membershipLevel === 2 ? 'Silver' : 'Gold'}</p>
          <p><strong>Established:</strong> ${member.establishedYear}</p>
          <p><strong>Industry:</strong> ${member.industry}</p>
        </div>
        <div class="company-logo">
          <img src="${member.icon}" alt="${member.name} logo" width="50" height="50" />
        </div>
      </div>
    `;

    // Add the newly created card to the container
    cards.appendChild(card);  // Ensure cards container exists
  });
};

// Call the function to fetch member data
getMemberData(url);
