const apiKey = "274A43957F2949F5B8F50EB4357AE6BF"; // Replace with your API key
const corsProxy = "https://justcors.com/tl_64195f4/"; // A public CORS proxy

document
  .getElementById("clearBookingsButton")
  .addEventListener("click", clearAllBookings);
document.getElementById("searchButton").addEventListener("click", searchItems);


async function fetchWithCors(url) {
  try {
    const response = await fetch(corsProxy + url, {
      method: "GET",
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

async function searchItems() {
  const query = document.getElementById("searchInput").value.trim();
  const category = document.getElementById("categorySelect").value;
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "Searching...";

  if (!query) {
    alert("Please enter a search term.");
    resultsContainer.innerHTML = "";
    return;
  }

  let url = "";
  switch (category) {
    case "attractions":
    case "restaurants":
    case "flights":
    case "hotels":
      url = `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=${query}&category=${category}&language=en`;
      break;
    default:
      throw new Error("Invalid category selected.");
  }

  try {
    const data = await fetchWithCors(url);
    console.log("API Response:", data);
    displayResults(data, resultsContainer);
  } catch (error) {
    console.error("Error fetching data:", error);
    resultsContainer.innerHTML = "No results found or there was an error.";
  }
}

function displayResults(data, resultsContainer) {
  resultsContainer.innerHTML = ""; // Clear previous results

  const items = Array.isArray(data.data) ? data.data : [];
  if (items.length === 0) {
    resultsContainer.innerHTML = "No results found.";
    return;
  }

  items.forEach((item) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    const address = item.address_obj?.address_string || "No address available";
    cardDiv.innerHTML = `
            <h3>${item.name || "Unnamed"}</h3>
            <p>${address}</p>
            <button class="save-button" data-name="${
              item.name || "Unnamed"
            }">Save Booking</button>
        `;
    resultsContainer.appendChild(cardDiv);
  });

  // Attach save buttons event listeners
  attachSaveButtonListeners();
}

function attachSaveButtonListeners() {
  const saveButtons = document.querySelectorAll(".save-button");
  saveButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      saveBooking(name);
    });
  });
}

function saveBooking(name) {
  console.log("Saving booking:", name); // Debugging line
  const savedBookingsContainer = document.getElementById("savedBookings");

  // Check if the booking is already saved
  const existingBookings = Array.from(savedBookingsContainer.children);
  if (existingBookings.some((booking) => booking.innerText.includes(name))) {
    alert(`"${name}" is already saved.`);
    return; // Prevent duplicate saves
  }

  // Create a new booking element
  const bookingDiv = document.createElement("div");
  bookingDiv.className = "card saved-card";
  bookingDiv.innerHTML = `<h3>${name}</h3>`;

  // Append the new booking to the saved bookings container
  savedBookingsContainer.appendChild(bookingDiv);
  alert(`Saved booking: ${name}`);
}
function clearAllBookings() {
  const savedBookingsContainer = document.getElementById("savedBookings");
  savedBookingsContainer.innerHTML = ""; // Clear all saved bookings
  alert("All saved bookings have been cleared.");
}
