// API key
let apiKey = "tc347f3bd3c7a100oc636b4fc92cd062";

// Format and display the current date and time
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;

  let days = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];

  return `${days[day]} ${hours}:${minutes}`;
}

// Show weather data in the UI
function showTemperature(response) {
  let temperatureElement = document.querySelector(".current-temperature-value");
  let humidityElement = document.querySelector(".current-humidity");
  let windElement = document.querySelector(".current-wind");

  let temperature = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);

  temperatureElement.innerHTML = `${temperature}°C`;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind} km/h`;
}

// Handle form submission
function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector(".search-input");
  let cityElement = document.querySelector(".current-city");

  let city = searchInputElement.value.trim();
  cityElement.innerHTML = city;

  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(showTemperature).catch(error => {
    console.error("Weather fetch error:", error);
    cityElement.innerHTML = "City not found!";
  });
}

// Add event listener to form
let searchForm = document.querySelector("#weather-form");
searchForm.addEventListener("submit", search);

// Show current date
let currentDateElement = document.querySelector("#current-date");
currentDateElement.innerHTML = formatDate(new Date());
