const positionLat = document.querySelector(".map-area__lat");
const positionLng = document.querySelector(".map-area__lng");
const cityCountry = document.querySelector(".location-date__city");
const currentTemp = document.querySelector(".weather__current--temperature");
const currentTempIcon = document.querySelector(".weather__current--icon");
const currentWeatherDetails = document.querySelector(".details__clouds");
const currentWeatherFeels = document.querySelector(".details__feels");
const currentWeatherWind = document.querySelector(".details__wind");
const currentWeatherHumidity = document.querySelector(".details__humidity");
const farenheitMode = document.getElementById("farenheit");
const celsiusMode = document.getElementById("celsius");

const weatherForecast1 = document.querySelector(".weather__forecast--day-1");
const weatherForecast2 = document.querySelector(".weather__forecast--day-2");
const weatherForecast3 = document.querySelector(".weather__forecast--day-3");

const forecastTemp1 = document.querySelector(
  ".weather__forecast--temperature-1"
);
const forecastTemp2 = document.querySelector(
  ".weather__forecast--temperature-2"
);
const forecastTemp3 = document.querySelector(
  ".weather__forecast--temperature-3"
);

const forecastIcon1 = document.querySelector(".weather__forecast--icon-1");
const forecastIcon2 = document.querySelector(".weather__forecast--icon-2");
const forecastIcon3 = document.querySelector(".weather__forecast--icon-3");

const searchButton = document.querySelector(".header__search-button");
const searchInput = document.querySelector(".header__search--form");
const refreshButton = document.querySelector(".header__buttons--refresh");

const date = document.querySelector(".location-date__date");
const time = document.querySelector(".location-time");
const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const keyWeather = "d2c04de69ed62d66d08538028617ce18";
let now = new Date(),
  mapLatitude,
  mapLongitude;

//-preloader-//
window.onload = function () {
  document.body.classList.add("loaded_hiding");
  window.setTimeout(function () {
    document.body.classList.add("loaded");
    document.body.classList.remove("loaded_hiding");
  }, 500);
};

// function renderBackground() {
//   fetch(
//     "https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=tJdVJxD140-P3Phv2uKMuOHpswNoGoxMWavWyVbzTK0"
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       document.body.style.backgroundImage = `linear-gradient(
//                 180deg,
//                 rgba(8, 15, 26, 0.59) 0%,
//                 rgba(58, 58, 129, 0.46) 100%
//               ), url(${data.urls.regular})`;
//       document.body.style.backgroundRepeat = "no-repeat";
//       document.body.style.backgroundSize = "cover";
//     });
// }

// refreshButton.addEventListener("click", renderBackground);

function getUserLocation() {
  return fetch("https://ipinfo.io/json?token=beefee580f15ff")
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      alert("Something went wrong");
    });
}

function initUserData() {
  getUserLocation()
    .then((data) => {
      let city = localStorage.getItem("searchValue");
      if (city !== null) {
        return getUserData(city);
      } else {
        const currentCity = data.city;
        return getUserData(currentCity);
      }
    })
    .then((currentUserTime) => {})
    .catch((err) => {
      alert("Something went wrong");
    });
}
initUserData();

function getUserData(locationCity) {
  return fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${locationCity}&language=en&key=bdca322080e3433b9f0e21d216562bea`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      cityCountry.textContent = `${data.results[0].formatted}`;
      positionLat.innerHTML = `Latitude: ${data.results[0].annotations.DMS.lat}`;
      positionLng.innerHTML = `Longitude: ${data.results[0].annotations.DMS.lng}`;
    })
    .catch((err) => {
      alert("Something went wrong");
    });
}

function initNewUserData() {
  changePosition()
    .then((location) => {
      const newCity = location.results[0].components.city;
      return getUserData(newCity);
    })
    .then((newUserData) => {})
    .catch((err) => {
      alert("Something went wrong");
    });
}

function initWeather() {
  getUserLocation()
    .then((location) => {
      let city = localStorage.getItem("searchValue");
      const currentCity = location.city;
      if (city !== null) {
        return getWeather(city);
      } else {
        return getWeather(currentCity);
      }
    })
    .then((currentWhether) => {})
    .catch((err) => {
      alert("Something went wrong");
    });
}
initWeather();

function getWeather(locationCity) {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${locationCity}&units=metric&appid=${keyWeather}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let degree = localStorage.getItem("radioDegree");
      if (degree) {
        if (degree === "farenheit") {
          currentTemp.innerHTML = `${Math.round(
            (data.list[0].main.temp * 9) / 5 + 32
          )}`;
          currentWeatherFeels.innerHTML = `FEELS LIKE: ${Math.round(
            (data.list[0].main.feels_like * 9) / 5 + 32
          )}&deg`;
          forecastTemp1.innerHTML = `${Math.round(
            (data.list[5].main.temp * 9) / 5 + 32
          )}&deg`;
          forecastTemp2.innerHTML = `${Math.round(
            (data.list[13].main.temp * 9) / 5 + 32
          )}&deg`;
          forecastTemp3.innerHTML = `${Math.round(
            (data.list[21].main.temp * 9) / 5 + 32
          )}&deg`;
        } else {
          currentTemp.innerHTML = `${Math.round(data.list[0].main.temp)}`;
          currentWeatherFeels.innerHTML = `FEELS LIKE: ${Math.round(
            data.list[0].main.feels_like
          )}&deg`;
          forecastTemp1.innerHTML = `${Math.round(data.list[5].main.temp)}&deg`;
          forecastTemp2.innerHTML = `${Math.round(
            data.list[13].main.temp
          )}&deg`;
          forecastTemp3.innerHTML = `${Math.round(
            data.list[21].main.temp
          )}&deg`;
        }
      }

      // currentTemp.innerHTML = `${Math.round(data.list[0].main.temp)}`;
      currentTempIcon.innerHTML = `<img src="assets/icons/${data.list[0].weather[0].icon}.svg">`;
      currentWeatherDetails.textContent = data.list[0].weather[0].description;
      currentWeatherWind.textContent = `WIND: ${data.list[0].wind.speed} km/h`;
      currentWeatherHumidity.textContent = `HUMIDITY: ${data.list[0].main.humidity} %`;
      forecastIcon1.innerHTML = `<img src="assets/icons/${data.list[5].weather[0].icon}.svg">`;
      forecastIcon2.innerHTML = `<img src="assets/icons/${data.list[13].weather[0].icon}.svg">`;
      forecastIcon3.innerHTML = `<img src="assets/icons/${data.list[21].weather[0].icon}.svg">`;

      mapLatitude = data.city.coord.lat.toFixed(2);
      mapLongitude = data.city.coord.lon.toFixed(2);

      //FORECAST WEEKDAYS//
      const week = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let today = new Date();
      let day = today.getDay();

      day++;
      if (day > week.length - 1) day = 0;
      weatherForecast1.textContent = week[day];
      day++;
      if (day > week.length - 1) day = 0;
      weatherForecast2.textContent = week[day];
      day++;
      if (day > week.length - 1) day = 0;
      day++;
      if (day > week.length - 1) day = 0;
      weatherForecast3.textContent = week[day];

      mapboxgl.accessToken =
        "pk.eyJ1IjoibHVlMjEiLCJhIjoiY2tpdzV5bmM2MHJ6ejMwbnozbmE0aDhkaiJ9.WU_nweukjgiOyA7Juh20nQ";
      map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [mapLongitude, mapLatitude], // starting position [lng, lat]
        zoom: 9,
      });

      farenheitMode.addEventListener("click", () => {
        currentTemp.innerHTML = `${Math.round(
          (data.list[0].main.temp * 9) / 5 + 32
        )}`;
        currentWeatherFeels.innerHTML = `FEELS LIKE: ${Math.round(
          (data.list[0].main.feels_like * 9) / 5 + 32
        )}&deg`;
        forecastTemp1.innerHTML = `${Math.round(
          (data.list[5].main.temp * 9) / 5 + 32
        )}&deg`;
        forecastTemp2.innerHTML = `${Math.round(
          (data.list[13].main.temp * 9) / 5 + 32
        )}&deg`;
        forecastTemp3.innerHTML = `${Math.round(
          (data.list[21].main.temp * 9) / 5 + 32
        )}&deg`;
      });
      celsiusMode.addEventListener("click", () => {
        currentTemp.innerHTML = `${Math.round(data.list[0].main.temp)}`;
        currentWeatherFeels.innerHTML = `FEELS LIKE: ${Math.round(
          data.list[0].main.feels_like
        )}&deg`;
        forecastTemp1.innerHTML = `${Math.round(data.list[5].main.temp)}&deg`;
        forecastTemp2.innerHTML = `${Math.round(data.list[13].main.temp)}&deg`;
        forecastTemp3.innerHTML = `${Math.round(data.list[21].main.temp)}&deg`;
      });
    })
    .catch((err) => {
      alert("Something went wrong");
    });
}

function changePosition() {
  let address = searchInput.value;
  return fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${address}&language=en&key=bdca322080e3433b9f0e21d216562bea`
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      alert("Something went wrong");
    });
}

function initNewWeather() {
  changePosition()
    .then((location) => {
      const currentCity = location.results[0].components.city;
      return getWeather(currentCity);
    })
    .then((currentWhether) => {})
    .catch((err) => {
      alert("Something went wrong");
    });
}
function clockDate() {
  const date = document.querySelector(".location-date__date");
  const time = document.querySelector(".location-time");
  let now = new Date(),
    hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours(),
    minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes(),
    weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    month = [
      "January",
      "February",
      "March",
      "Aplil",
      "May",
      "June",
      "July",
      "August",
      "Semtembre",
      "Octobre",
      "November",
      "December",
    ];

  time.innerHTML = hours + ":" + minutes;
  date.textContent = `${weekday[now.getDay()]} 
                        ${now.getDate()} 
                        ${month[now.getMonth()]}`;
}
setInterval(clockDate, 50000);
clockDate();

searchButton.addEventListener("click", initNewWeather);
searchButton.addEventListener("click", initNewUserData);
searchInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchButton.click();
  }
});

//--F/C to LOCAL STORAGE--//

let selector = document.getElementsByName("selector");
for (let i = 0; i < selector.length; i++) {
  selector[i].onclick = function () {
    localStorage.setItem("radioDegree", this.value);
  };
}
if (localStorage.getItem("radioDegree")) {
  let radioDegree = localStorage.getItem("radioDegree");
  document
    .querySelector('input[name="selector"][value="' + radioDegree + '"]')
    .setAttribute("checked", "checked");
}

//--SEARCH VALUE TO LOCALSTORAGE--//

searchButton.addEventListener("click", function (event) {
  let currentCity = searchInput.value;
  localStorage.setItem("searchValue", currentCity);
});
