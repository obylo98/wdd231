document.addEventListener("DOMContentLoaded", function () {
  const ham = document.querySelector("#menu");
  const nav = document.querySelector("nav");
  const visitMessage = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = new Date();
  const nowTime = now.getTime();

  // Responsive ham and nav
  ham.addEventListener("click", () => {
    ham.classList.toggle("show");
    nav.classList.toggle("show");
  });

  if (!lastVisit) {
    visitMessage.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const lastVisitedTime = new Date(parseInt(lastVisit));
    const timeDifference = nowTime - lastVisitedTime.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    if (daysDifference < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      visitMessage.textContent = `You last visited ${daysDifference} day${
        daysDifference > 1 ? "s" : ""
      } ago.`;
    }
  }

  localStorage.setItem("lastVisit", nowTime);

  // Lazy loading for images
  const lazyImages = document.querySelectorAll("img.lazy");
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: "0px 0px 256px 0px" }
  );

  lazyImages.forEach((image) => {
    imageObserver.observe(image);
  });

  // Fetch weather data
  fetchWeather();
});

// Function to fetch weather data
function fetchWeather() {
  const apiKey = "fa1b52168658bac8c6d12ea05893adba"; // Replace with your OpenWeather API Key
  const city = "Lagos"; // Replace with the relevant city

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
  )
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

// Function to display weather data in the sidebar
function displayWeather(data) {
  const sidebar = document.getElementById("sidebar");
  const weatherInfo = document.createElement("div");
  weatherInfo.classList.add("weather-info");

  const temperature = data.main.temp;
  const tempMax = data.main.temp_max;
  const tempMin = data.main.temp_min;
  const humidity = data.main.humidity;
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
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

// Helper function to get weather emoji based on description
function getWeatherEmoji(description) {
  if (description.includes("clear")) return "☀️";
  if (description.includes("clouds")) return "☁️";
  if (description.includes("rain")) return "🌧️";
  if (description.includes("snow")) return "❄️";
  if (description.includes("storm")) return "⛈️";
  return "🌤️"; // Default
}
