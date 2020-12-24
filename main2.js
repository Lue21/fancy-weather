renderBackground();
setInterval(clockDate, 50000);
clockDate();

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

function getUserLocation() {
  return fetch("https://ipinfo.io/json?token=beefee580f15ff").then(
    (response) => {
      return response.json();
    }
  );
}

function getWeather(locationCity) {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${locationCity}&units=metric&appid=${keyWeather}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      currentTemp.innerHTML = `${Math.round(data.list[0].main.temp)}`;
      currentTempIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">`;
      currentWeatherDetails.textContent = data.list[0].weather[0].description;
      currentWeatherFeels.innerHTML = `FEELS LIKE: ${Math.round(data.list[0].main.feels_like)}&deg`;
      currentWeatherWind.textContent = `WIND: ${data.list[0].wind.speed} km/h`;
      currentWeatherHumidity.textContent = `HUMIDITY: ${data.list[0].main.humidity} %`;
      forecastTemp1.innerHTML = `${Math.round(data.list[5].main.temp)}&deg`;
      forecastTemp2.innerHTML = `${Math.round(data.list[13].main.temp)}&deg`;
      forecastTemp3.innerHTML = `${Math.round(data.list[21].main.temp)}&deg`;
      forecastIcon1.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[5].weather[0].icon}@2x.png">`;
      forecastIcon2.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[13].weather[0].icon}@2x.png">`;
      forecastIcon3.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[21].weather[0].icon}@2x.png">`;
        
      mapLatitude = data.city.coord.lat.toFixed(2);
      mapLongitude = data.city.coord.lon.toFixed(2);
     
      positionLat.innerHTML = `Latitude: ${mapLatitude.replace(/\./g, '&deg')}'`;
      positionLng.innerHTML = `Longitude: ${mapLongitude.replace(/\./g, '&deg')}'`;
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
      cityCountry.textContent = `${data.city.name}, ${data.city.country}`;

      mapboxgl.accessToken = 'pk.eyJ1IjoibHVlMjEiLCJhIjoiY2tpdzV5bmM2MHJ6ejMwbnozbmE0aDhkaiJ9.WU_nweukjgiOyA7Juh20nQ';
        map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [mapLongitude, mapLatitude], // starting position [lng, lat]
        zoom: 9
        }); 
        
        
      //ferenheit
      farenheitMode.addEventListener("click", () => {
        currentTemp.innerHTML = `${Math.round(
          (data.list[0].main.temp * 9) / 5 + 32)}`;
        currentWeatherFeels.innerHTML = `FEELS LIKE: ${Math.round(
          (data.list[0].main.feels_like * 9) / 5 + 32)}&deg`;
        forecastTemp1.innerHTML = `${Math.round(
          (data.list[5].main.temp * 9) / 5 + 32)}&deg`;
        forecastTemp2.innerHTML = `${Math.round(
          (data.list[13].main.temp * 9) / 5 + 32)}&deg`;
        forecastTemp3.innerHTML = `${Math.round(
          (data.list[21].main.temp * 9) / 5 + 32)}&deg`;
      });
      celsiusMode.addEventListener("click", () => {
        currentTemp.innerHTML = `${Math.round(data.list[0].main.temp)}`;
        currentWeatherFeels.innerHTML = `FEELS LIKE: ${Math.round(
          data.list[0].main.feels_like)}&deg`;
        forecastTemp1.innerHTML = `${Math.round(
          data.list[5].main.temp)}&deg`;
        forecastTemp2.innerHTML = `${Math.round(
          data.list[13].main.temp)}&deg`;
        forecastTemp3.innerHTML = `${Math.round(
          data.list[21].main.temp)}&deg`;
      });

    });
}

function init() {
  getUserLocation()
    .then((location) => {
      const currentCity = location.city;
      return getWeather(currentCity);
    })
    .then((currentWhether) => {});
}
init();

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

function renderBackground() {
  fetch(
    "https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=tJdVJxD140-P3Phv2uKMuOHpswNoGoxMWavWyVbzTK0"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.body.style.backgroundImage = `linear-gradient(
                180deg,
                rgba(8, 15, 26, 0.59) 0%,
                rgba(58, 58, 129, 0.46) 100%
              ), url(${data.urls.regular})`;
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";  
    });
}

refreshButton.addEventListener("click", renderBackground);


function changePosition() {
    let address = searchInput.value;
    const geocoding = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=bdca322080e3433b9f0e21d216562bea`;
    fetch(geocoding)
        .then(function (resp) {
            return resp.json();
        }).
        then(function (data) {
            console.log(data);
            mapboxgl.accessToken = 'pk.eyJ1IjoibHVlMjEiLCJhIjoiY2tpdzV5bmM2MHJ6ejMwbnozbmE0aDhkaiJ9.WU_nweukjgiOyA7Juh20nQ';
            map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [data.results[0].geometry.lng, data.results[0].geometry.lat], // starting position [lng, lat]
                zoom: 9
    
            });

            let apiWeatherForecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${data.results[0].geometry.lat}&lon=${data.results[0].geometry.lng}&units=metric&appid=${keyWeather}`;
            fetch(apiWeatherForecast)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    currentTemp.innerHTML = `${Math.round(data.list[0].main.temp)}`;
                    currentTempIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">`;
                    currentWeatherDetails.textContent = data.list[0].weather[0].description;
                    currentWeatherFeels.innerHTML = `FEELS LIKE: ${Math.round(data.list[0].main.feels_like)}&deg`;
                    currentWeatherWind.textContent = `WIND: ${data.list[0].wind.speed} km/h`;
                    currentWeatherHumidity.textContent = `HUMIDITY: ${data.list[0].main.humidity} %`;
                    forecastTemp1.innerHTML = `${Math.round(data.list[5].main.temp)}&deg`;
                    forecastTemp2.innerHTML = `${Math.round(data.list[13].main.temp)}&deg`;
                    forecastTemp3.innerHTML = `${Math.round(data.list[21].main.temp)}&deg`;
                    forecastIcon1.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[5].weather[0].icon}@2x.png">`;
                    forecastIcon2.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[13].weather[0].icon}@2x.png">`;
                    forecastIcon3.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[21].weather[0].icon}@2x.png">`;
                    
                    mapLatitude = data.city.coord.lat;
                    mapLongitude = data.city.coord.lon;
                    cityCountry.textContent = `${data.city.name}, ${data.city.country}`;
                    positionLat.textContent = `Latitude: ${data.city.coord.lat.toFixed(2)}°`;
                    positionLng.textContent = `Longitude: ${data.city.coord.lon.toFixed(2)}°`;

            
                });
        });
}
searchButton.addEventListener('click', renderBackground);   
searchButton.addEventListener('click', changePosition);
searchInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     searchButton.click();
    }
});

