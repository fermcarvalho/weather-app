// feature 1

function changeDateAndYear(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentYear = date.getFullYear();
  let currentDateAndYear = `${currentMonth} ${currentDate}, ${currentYear}`;
  return currentDateAndYear; //
}

function changeDayAndTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
  let currentDayandHour = `${currentDay} ${currentHour}:${currentMinutes}`;
  return currentDayandHour;
}
let now = new Date();
let changeDate = document.querySelector("#current-date-year");
changeDate.innerHTML = changeDateAndYear(now);
let changeTime = document.querySelector("#current-day-hour");
changeTime.innerHTML = changeDayAndTime(now);

// Bonus Feature

function convertToF(temp) {
  return temp * 1.8 + 32;
}

function convertToC(temp) {
  return (temp - 32) / 1.8;
}

function updateTempToCelsius(event) {
  event.preventDefault();
  let currentTempF = document.querySelector("#main-temperature");
  let celsiusTemp = convertToC(currentTempF.innerHTML);
  currentTempF.innerHTML = Math.round(celsiusTemp);
}

function updateTempFarenheit(event) {
  event.preventDefault();
  let currentTempC = document.querySelector("#main-temperature");
  let farenheitTemp = convertToF(currentTempC.innerHTML);
  currentTempC.innerHTML = Math.round(farenheitTemp);
}
let changeTemperatureCelsius = document.querySelector("#change-to-celsius");
changeTemperatureCelsius.addEventListener("click", updateTempToCelsius);

let changeTemperatureFarenheit = document.querySelector("#change-to-farenheit");
changeTemperatureFarenheit.addEventListener("click", updateTempFarenheit);

//homework week 5
//when a user searches for a city, it should display the name of the city on the result page
//and the current temperature of the city.

function displayForescast() {
  let forescastElement = document.querySelector("#weather-forecast");
  let forecastHTML = ``;
  let days = ["THU", "FRI", "SAT", "SUN"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col text-center">
          <div class="fw-bold weather-forecast-date">${day}</div>
          <div class="mt-3">
            <i class="fa-solid fa-2xl fa-cloud-sun"></i>
          </div>
          <div class="weather-forecast-temperatures mt-4">
            <span class="weather-forecast-max"> H:4° </span>
            <span class="weather-forecast-min"> L:-6° </span>
          </div>
          </div>
        </div>
      `;
  });
  forecastHTML = forecastHTML + ``;
  forescastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let displayTemperature = document.querySelector("#main-temperature");
  displayTemperature.innerHTML = `${temperature}`;
  let changeCity = document.querySelector("#city");
  changeCity.innerHTML = ` ${response.data.name}`;
  let weatherCondition = response.data.weather[0].description;
  let displayWeatherCondition = document.querySelector("#sky-condition");
  displayWeatherCondition.innerHTML = `${weatherCondition}`;
  let realFeelWeather = Math.round(response.data.main.feels_like);
  let feelsLikeTemp = document.querySelector("#feelsLikeTemp");
  feelsLikeTemp.innerHTML = ` ${realFeelWeather}°C`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

function searchForCity(city) {
  let apiKey = "15b6ba0523386a8a73b38b2440a74dea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchForCity(city);
}

// bonus feature added a feature when click on the city of the top change the weather
function searchOnClick(event) {
  event.preventDefault();
  const city = event.target.innerText;
  searchForCity(city);
}

const citySearch = document.querySelector(".city-choice");
citySearch.addEventListener("click", searchOnClick);

function showCurrentPosition(position) {
  let apiKey = "15b6ba0523386a8a73b38b2440a74dea";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

//bonus feature - add a current location button
//when click on it , it uses the Geolocation API to get your GPS coordinates
//and display and the city and current temperature using the OpenWeather API.

function showGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", showGeoLocation);
let form = document.querySelector("#search-form");
form.addEventListener("submit", getCityInput);

searchForCity("Calgary");
displayForescast();
