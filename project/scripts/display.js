import { searchLocations } from "./tripAdvisorAPI.js";

let currentPage = 1; // Track current page

export async function searchAndDisplay(query, filters = {}, page = 1) {
  // Build filter parameters into a query string
  let filterQuery = "";
  if (filters.continent) {
    filterQuery += `&continent=${filters.continent.join(",")}`;
  }
  // Add other filters here, e.g., for country

  const offset = (page - 1) * 10; // Adjust for pagination, assuming 10 results per page
  const results = await searchLocations(query, "", 50, "", offset, filterQuery); // Add offset and filters to the API call

  if (results) {
    const destinationContainer = document.getElementById("destination-cards");
    destinationContainer.innerHTML = results.data
      .map(
        (location) => `
            <div class="card">
                <img src="${
                  location.photo
                    ? location.photo.images.large.url
                    : "default.jpg"
                }" alt="${location.name}" />
                <h3>${location.name}</h3>
                <p>${location.address_string}</p>
            </div>
        `
      )
      .join("");
  }

  // Update pagination display
  updatePagination(page, results.total_results);
}

function updatePagination(currentPage, totalResults) {
  const totalPages = Math.ceil(totalResults / 10); // 10 results per page
  document.getElementById("pagination").innerHTML = `
        <button onclick="navigatePage(${Math.max(
          1,
          currentPage - 1
        )})">&larr;</button>
        ${Array.from(
          { length: totalPages },
          (_, i) => `
            <button onclick="navigatePage(${i + 1})" ${
            currentPage === i + 1 ? 'class="active"' : ""
          }>${i + 1}</button>
        `
        ).join("")}
        <button onclick="navigatePage(${Math.min(
          totalPages,
          currentPage + 1
        )})">&rarr;</button>
    `;
}

window.navigatePage = (page) => {
  currentPage = page;
  searchAndDisplay(searchInput.value, selectedFilters, currentPage);
};
