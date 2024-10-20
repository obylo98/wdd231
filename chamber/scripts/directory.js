document.addEventListener('DOMContentLoaded', () => {

  // Target elements for the first HTML file 
  const cards = document.querySelector("#bussiness");
  const ham = document.querySelector("#menu");
  const nav = document.querySelector("nav");
  const gridbutton = document.querySelector("#grid");
  const listbutton = document.querySelector("#list");

  // Only run this part if the element exists 
  if (ham && nav) {
    // Responsive ham and nav
    ham.addEventListener("click", () => {
      ham.classList.toggle("show");
      nav.classList.toggle("show");
    });
  }

  // Grid/list toggle functionality (only if these buttons exist)
  if (gridbutton && listbutton && cards) {
    gridbutton.addEventListener("click", () => {
      cards.classList.add("grid");
      cards.classList.remove("list");
    });

    listbutton.addEventListener("click", () => {
      cards.classList.add("list");
      cards.classList.remove("grid");
    });
  }

  // Inject date into the document if the relevant element exists
  const yearElement = document.querySelector("#year");
  const lastModifiedElement = document.querySelector("#lastmodified");
  if (yearElement && lastModifiedElement) {
    const date = new Date();
    yearElement.innerHTML = date.getFullYear();
    lastModifiedElement.innerHTML = `Last modified: ${document.lastModified}`;
  }

  // Fetch and display business members data o
  if (cards) {
    const url = "./data/members.json";
    getMemberData(url);
  }

  // For the second HTML file (e.g., discover.html)
  const visitMessage = document.getElementById('visit-message');
  if (visitMessage) {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date();
    const nowTime = now.getTime();

    if (!lastVisit) {
      visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const lastVisitedTime = new Date(parseInt(lastVisit));
      const timeDifference = nowTime - lastVisitedTime.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

      visitMessage.textContent = daysDifference < 1 ? "Back so soon! Awesome!" :
        `You last visited ${daysDifference} day${daysDifference > 1 ? 's' : ''} ago.`;
    }

    localStorage.setItem('lastVisit', nowTime);
  }

  // Lazy loading for images
  const lazyImages = document.querySelectorAll('img.lazy');
  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: "0px 0px 256px 0px" });

    lazyImages.forEach(image => {
      imageObserver.observe(image);
    });
  }

  // Fetch weather data only on discover.html (if sidebar exists)
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    fetchWeather();
  }

  const welcome = document.querySelector("#vist-message");
  const closeBtn = document.querySelector("#close");

  // Check if the welcome and close button elements exist
  if (welcome && closeBtn) {
    closeBtn.addEventListener("click", () => {
      welcome.classList.toggle("close");
      closeBtn.classList.toggle("close");
    });
  }
});

// Function to fetch weather data
function fetchWeather() {
  const apiKey = 'fa1b52168658bac8c6d12ea05893adba'; 
  const city = 'Lagos'; 

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

// Function to display weather data in the sidebar
function displayWeather(data) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const weatherInfo = document.createElement('div');
  weatherInfo.classList.add('weather-info');

  const temperature = data.main.temp;
  const tempMax = data.main.temp_max;
  const tempMin = data.main.temp_min;
  const humidity = data.main.humidity;
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const weatherDescription = data.weather[0].description;
  const weatherIcon = data.weather[0].icon;

  const weatherEmoji = getWeatherEmoji(weatherDescription);

  weatherInfo.innerHTML = `
      <h3>Current Weather ${weatherEmoji}</h3>
      <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="${weatherDescription}">
      <p>Temperature: ${temperature} °F</p>
      <p>High: ${tempMax} °F, Low: ${tempMin} °F</p>
      <p>Humidity: ${humidity}%</p>
      <p>Sunrise: ${sunrise}</p>
      <p>Sunset: ${sunset}</p>
      <p>${weatherDescription}</p>
  `;

  sidebar.appendChild(weatherInfo);
}

// Helper function to get weather emoji
function getWeatherEmoji(description) {
  if (description.includes('clear')) return '☀️';
  if (description.includes('clouds')) return '☁️';
  if (description.includes('rain')) return '🌧️';
  if (description.includes('snow')) return '❄️';
  if (description.includes('storm')) return '⛈️';
  return '🌤️'; // Default
}

// Function to fetch member data
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

// Function to display company cards
const cardsCompanies = (members) => {
  const cards = document.querySelector("#bussiness");
  if (!cards) return;

  members.forEach((member) => {
    let card = document.createElement("section");

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

    cards.appendChild(card);
  });
};
