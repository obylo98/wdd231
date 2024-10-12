// DOM
const cards = document.querySelector("#bussiness");
const ham = document.querySelector("#menu");
const nav = document.querySelector("nav");
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const temp = document.querySelector("#temp");
const desc = document.querySelector("#desc");
const high = document.querySelector("#high");
const low = document.querySelector("#low");
const humid = document.querySelector("#humidity");
const rise = document.querySelector("#rise");
const set = document.querySelector("#set");
const day1 = document.querySelector("#duration1");
const day2 = document.querySelector("#duration2");
const day3 = document.querySelector("#duration3");

window.addEventListener("DOMContentLoaded", () => {
  fetchWeather();
  getMemberData(memberUrl);
  ham.addEventListener("click", () => {
    // Toggle hamburger 
    ham.classList.toggle("show");
    nav.classList.toggle("show");
  });
});

// Grid/List toggle
gridbutton.addEventListener("click", () => {
  cards.classList.add("grid");
  cards.classList.remove("list");
});

listbutton.addEventListener("click", () => {
  cards.classList.add("list");
  cards.classList.remove("grid");
});
// Weather API integration
const api = "fa1b52168658bac8c6d12ea05893adba";
const lat = "6.5833";
const lon = "3.75";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api}&cnt=17&units=imperial`;

async function fetchWeather() {
  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl),
    ]);

    if (weatherResponse.ok && forecastResponse.ok) {
      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      // Display data if received successfully
      displayWeatherResults(weatherData, forecastData);
    } else {
      throw new Error("Error fetching weather data");
    }
  } catch (error) {
    console.error("Weather fetch error:", error);
  }
}

function displayWeatherResults(data, data2) {
  // Check if the DOM elements exist before updating them
  if (temp && desc && high && low && humid && rise && set) {
    // Checking if data has the necessary fields
    if (!data.main || !data.weather || data.weather.length === 0) {
      console.error("Missing weather data fields", data);
      return;
    }

    temp.innerHTML = `${data.main.temp}&deg;F`;
    desc.innerHTML = data.weather[0].description;
    high.innerHTML = `High: ${data.main.temp_max}&deg;F`;
    low.innerHTML = `Low: ${data.main.temp_min}&deg;F`;
    humid.innerHTML = `Humidity: ${data.main.humidity}%`;

    const riseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const setTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    rise.innerHTML = `Sunrise: ${riseTime}`;
    set.innerHTML = `Sunset: ${setTime}`;

    // Ensure forecast data is available
    if (data2.list && data2.list.length >= 16) {
      day1.innerHTML = `Today: <strong>${data2.list[0].main.temp}⁰F</strong>`;
      day2.innerHTML = `${getWeekDay(1)}: <strong>${
        data2.list[8].main.temp
      }⁰F</strong>`;
      day3.innerHTML = `${getWeekDay(2)}: <strong>${
        data2.list[16].main.temp
      }⁰F</strong>`;
    } else {
      console.error("Insufficient forecast data", data2);
    }
  } else {
    console.error("One or more DOM elements for weather data are missing.");
  }
}

function getWeekDay(mod) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const adjustedDay = (new Date().getDay() + mod) % 7;
  return weekday[adjustedDay];
}

// Member data
const memberUrl = "./data/members.json";

async function getMemberData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayMembers(data);
    } else {
      throw new Error("Error fetching member data");
    }
  } catch (error) {
    console.error("Member fetch error:", error);
  }
}

function displayMembers(data) {
  // Clear existing elements before adding new ones
  cards.innerHTML = "";

  // Filter members with Gold or Silver membership
  const filteredMembers = data.filter(
    (member) => member.membershipLevel === 2 || member.membershipLevel === 3
  );

  if (filteredMembers.length > 0) {
    // Select 3 random members to display
    const membersToDisplay = getRandomMembers(filteredMembers, 3);
    cardsCompanies(membersToDisplay);
  } else {
    console.log("No Gold or Silver members found.");
  }
}

function getRandomMembers(members, count) {
  const randomMembers = [];
  while (randomMembers.length < count) {
    const randomIndex = Math.floor(Math.random() * members.length);
    if (!randomMembers.includes(members[randomIndex])) {
      randomMembers.push(members[randomIndex]);
    }
  }
  return randomMembers;
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
          <p><strong>Website:</strong> <a href="${
            member.website
          }" target="_blank">${member.website}</a></p>
          <p><strong>Membership Level:</strong> ${getMembershipLevel(
            member.membershipLevel
          )}</p>
          <p><strong>Established:</strong> ${member.establishedYear}</p>
          <p><strong>Industry:</strong> ${member.industry}</p>
        </div>
        <div class="company-logo">
          <img src="${member.icon}" alt="${
      member.name
    } logo" width="50" height="50" style="object-fit: cover;" />
        </div>
      </div>
    `;

    // Add the newly created card to the container
    cards.appendChild(card);
  });
};


function getMembershipLevel(level) {
  if (level === 1) return "Member";
  if (level === 2) return "Silver";
  return "Gold";
}
