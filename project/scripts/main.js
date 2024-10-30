// script.js
document.querySelector(".hamburger-menu").addEventListener("click", () => {
  document.querySelector(".mobile-menu").classList.toggle("show");
});

const url = "./data/article.json"; // JSON file location

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to dynamically populate the news section
function populateNewsSection(data) {
  const newsContent = document.querySelector(".news-content");

  // Clear any existing content
  newsContent.innerHTML = "";

  // Shuffle the articles and pick the first 4
  const randomArticles = shuffleArray(data.articles).slice(0, 4);

  // Create the main article from the first item in the random selection
  const mainArticle = `
    <div class="main-article">
      <img src="${randomArticles[0].picture}" alt="${randomArticles[0].title}" />
      <p>${randomArticles[0].title}</p>
      <span>${randomArticles[0].read_time}</span>
    </div>
  `;

  // Insert the main article
  newsContent.innerHTML += mainArticle;

  // Create the secondary articles from the remaining 3 items
  const secondaryArticles = randomArticles
    .slice(1)
    .map(
      (article) => `
    <div class="secondary-article">
      <img src="${article.picture}" alt="${article.title}" />
      <p>${article.title}</p>
      <span>${article.read_time}</span>
    </div>
  `
    )
    .join("");

  // Wrap secondary articles and insert them into the news section
  newsContent.innerHTML += `<div class="secondary-articles">${secondaryArticles}</div>`;
}

// Load JSON data and call the populate function
document.addEventListener("DOMContentLoaded", () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      populateNewsSection(data);
    })
    .catch((error) => console.error("Error loading JSON data:", error));
});
