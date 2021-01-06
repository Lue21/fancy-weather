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
const enLang = document.querySelector('.header__buttons--enLanguage');
const ruLang = document.querySelector('.header__buttons--ruLanguage');
const forecastTemp1 = document.querySelector(
  ".weather__forecast--temperature-1");
const forecastTemp2 = document.querySelector(
  ".weather__forecast--temperature-2");
const forecastTemp3 = document.querySelector(
  ".weather__forecast--temperature-3");
const forecastIcon1 = document.querySelector(".weather__forecast--icon-1");
const forecastIcon2 = document.querySelector(".weather__forecast--icon-2");
const forecastIcon3 = document.querySelector(".weather__forecast--icon-3");
const searchButton = document.querySelector(".header__search-button");
const searchInput = document.querySelector(".header__search--form");
const refreshButton = document.querySelector(".header__buttons--refresh");
const date = document.querySelector(".location-date__date");
const time = document.querySelector(".location-time");
const keyWeather = "d2c04de69ed62d66d08538028617ce18";
let now = new Date(),
  mapLatitude,
  mapLongitude;


window.onload = function () {
  if (localStorage.getItem('lang') === null) {
    localStorage.setItem('lang', 'en');
    enLang.classList.add("active");
  } else if (localStorage.getItem('bg') !== null) {
    document.body.style.backgroundImage = `linear-gradient(
      180deg,
      rgba(8, 15, 26, 0.59) 0%,
      rgba(58, 58, 129, 0.46) 100%
    ), url(${localStorage.getItem('bg')})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  } else if (localStorage.getItem('lang') === 'ru') {
    ruLang.classList.add("active");
  }
  document.body.classList.add("loaded_hiding");
  window.setTimeout(function () {
    document.body.classList.add("loaded");
    document.body.classList.remove("loaded_hiding");
  }, 1000);
};

function renderBackground() {
  fetch(
    "https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=tJdVJxD140-P3Phv2uKMuOHpswNoGoxMWavWyVbzTK0"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let bgImage = data.urls.regular;
      localStorage.setItem('bg', bgImage);
      document.body.style.backgroundImage = `linear-gradient(
                180deg,
                rgba(8, 15, 26, 0.59) 0%,
                rgba(58, 58, 129, 0.46) 100%
              ), url(${data.urls.regular})`;
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
    });
}

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
      let lang = localStorage.getItem("lang");
      if (city !== null) {
        return getUserData(city, lang);
      } else  {
        const currentCity = data.city;
        let lang = localStorage.getItem("lang");
        return getUserData(currentCity, lang);
      }
    })
    .then((currentUserTime) => {})
    .catch((err) => {
      alert("Something went wrong");
    });
}

function getUserData(locationCity, lang) {
  return fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${locationCity}&language=${lang}&key=bdca322080e3433b9f0e21d216562bea`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      cityCountry.textContent = `${data.results[0].formatted}`;
      // let timeZone = data.results[0].annotations.timezone.offset_sec;
      // return clockDate(timeZone);

    })
    .catch((err) => {
      alert("Something went wrong");
    });
}

function initNewUserData() {
  changePosition()
    .then((location) => {
      const newCity = location.results[0].components.city;
      let lang = localStorage.getItem("lang");
      return getUserData(newCity, lang);
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
      let lang = localStorage.getItem("lang");

      if (city !== null) {
        return getWeather(city, lang);
      } else {
        let lang = localStorage.getItem("lang");
        return getWeather(currentCity, lang);
      }
    })

    .catch((err) => {
      alert("Something went wrong");
    });
}

function getWeather(locationCity, lang) {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${locationCity}&units=metric&lang=${lang}&appid=${keyWeather}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      positionLat.innerHTML = `${data.city.coord.lat}`;
      positionLng.innerHTML = `${data.city.coord.lon}`;
      let degree = localStorage.getItem("radioDegree");
      if (degree) {
        if (degree === "farenheit") {
          currentTemp.innerHTML = `${Math.round(
            (data.list[0].main.temp * 9) / 5 + 32
          )}`;
          currentWeatherFeels.innerHTML = ` ${Math.round(
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
          currentWeatherFeels.innerHTML = ` ${Math.round(
            data.list[0].main.feels_like)}&deg`;
          forecastTemp1.innerHTML = `${Math.round(data.list[5].main.temp)}&deg`;
          forecastTemp2.innerHTML = `${Math.round(
            data.list[13].main.temp)}&deg`;
          forecastTemp3.innerHTML = `${Math.round(
            data.list[21].main.temp
          )}&deg`;
        }
      }

      currentTempIcon.innerHTML =
        `<img src="../assets/icons/${data.list[0].weather[0].icon}.svg">`;
      currentWeatherDetails.textContent = data.list[0].weather[0].description;
      currentWeatherWind.textContent = `${data.list[0].wind.speed} m/s`;
      currentWeatherHumidity.textContent =
        `${data.list[0].main.humidity} %`;
      forecastIcon1.innerHTML =
        `<img src="../assets/icons/${data.list[5].weather[0].icon}.svg">`;
      forecastIcon2.innerHTML =
        `<img src="../assets/icons/${data.list[13].weather[0].icon}.svg">`;
      forecastIcon3.innerHTML =
        `<img src="../assets/icons/${data.list[21].weather[0].icon}.svg">`;

      mapLatitude = data.city.coord.lat.toFixed(2);
      mapLongitude = data.city.coord.lon.toFixed(2);

      //FORECAST WEEKDAYS//
      let week = [];

      week = [
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
      weatherForecast3.textContent = week[day];
      if (day > week.length - 1) day = 0;
      day++;

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
        currentWeatherFeels.innerHTML = ` ${Math.round(
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
        currentWeatherFeels.innerHTML = ` ${Math.round(
          data.list[0].main.feels_like)}&deg`;
        forecastTemp1.innerHTML = `${Math.round(data.list[5].main.temp)}&deg`;
        forecastTemp2.innerHTML = `${Math.round(data.list[13].main.temp)}&deg`;
        forecastTemp3.innerHTML = `${Math.round(data.list[21].main.temp)}&deg`;
        
      });
      // let timeZone = `${data.city.timezone / 60 / 60}`;
      // return newClock(timeZone);

    })
    .catch((err) => {
      alert("Something went wrong");
    });
}

function changePosition() {
  let address = searchInput.value;
  let lang = localStorage.getItem("lang");

  return fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${address}&language=${lang}&key=bdca322080e3433b9f0e21d216562bea`
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
      let lang = localStorage.getItem("lang");

      return getWeather(currentCity, lang);
    })
    .then((currentWhether) => {



      
    })
    .catch((err) => {
      alert("Something went wrong");
    });
}

function clockDate() {

  if (localStorage.getItem('lang') === 'ru') {
   
    let now = new Date(),
      hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours(),
      minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes(),
      seconds = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

    let weekday = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    let month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
        "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    
    time.innerHTML = `${ hours }:${ minutes }:${ seconds }`;
  date.textContent = `${weekday[now.getDay()]} 
                        ${now.getDate()} 
                        ${month[now.getMonth()]}`;
  } else {
    let now = new Date(),
      hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours(),
      minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes(),
      seconds = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
    let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let month = ["January", "February", "March", "Aplil", "May", "June", "July", "August", "Semtembre", "Octobre", "November", "December"];
    
    
    time.innerHTML = `${ hours }:${ minutes }:${ seconds }`;
    date.textContent = `${weekday[now.getDay()]} 
                            ${now.getDate()} 
                            ${month[now.getMonth()]}`;
  }
}

//--F/C to LOCAL STORAGE--//
function setDegree() {
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
} else {
  selector = localStorage.setItem('radioDegree', 'celsius');
}

}

function changeLanguage() {

  if (localStorage.getItem('lang') === 'ru') {   

    searchButton.innerText = 'ПОИСК';
    searchInput.placeholder = "Название города";
    document.querySelector('.latitude').innerHTML = 'Широта:';
    document.querySelector('.longitude').innerHTML = 'Долгота:';
    document.querySelector('.feels').textContent = 'ПОХОЖЕ НА:';
    document.querySelector('.wind').textContent = 'ВЕТЕР: ';
    document.querySelector('.humidity').textContent = 'ВЛАЖНОСТЬ: ';
    
  } else {
    searchButton.innerText = 'SEARCH';
    searchInput.placeholder = "Search city";
    document.querySelector('.latitude').innerHTML = 'Latitude:';
    document.querySelector('.longitude').innerHTML = 'Longitude:';
    document.querySelector('.feels').textContent = `FEELS LIKE :`;
    document.querySelector('.wind').textContent = 'WIND: ';
    document.querySelector('.humidity').textContent = 'HUMIDITY: ';

  }  
}

function dayWeek() {

  if (localStorage.getItem('lang') === 'ru') {

    let week = [];

      week = ['Воскресенье',
        'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
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
      weatherForecast3.textContent = week[day];
      if (day > week.length - 1) day = 0;
      day++;
        
  } else {

    let week = [];
          week = [
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
          weatherForecast3.textContent = week[day];
          if (day > week.length - 1) day = 0;
          day++;
        }
}

searchButton.addEventListener("click", initNewWeather);
searchButton.addEventListener("click", initNewUserData);
searchInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchButton.click();
  }
});
refreshButton.addEventListener("click", renderBackground);
ruLang.addEventListener('click', function () {
  initUserData();
  initWeather();

  localStorage.setItem('lang', 'ru');
  enLang.classList.remove('active');
  ruLang.classList.add('active');
});

enLang.addEventListener('click', function () {
  initUserData();
  initWeather();
  localStorage.setItem('lang', 'en');
  ruLang.classList.remove('active');
  enLang.classList.add('active');
});
searchButton.addEventListener("click", function (event) {
  let currentCity = searchInput.value;
  localStorage.setItem("searchValue", currentCity);
  renderBackground();
});
// searchButton.addEventListener("click", renderBackground);

// function newClock(timeZone) {
//   let now = new Date(),
//     hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
//   timeZone = +timeZone - 3;
//   if (Math.sign(timeZone) === 1) {
//     let newHour = `${hours - timeZone}`;
//     return clockDate(newHour);
//   } else {
//     let newHour = `${hours + (timeZone)}`;
//     return clockDate(newHour);

//   }
// }
dayWeek();
setInterval(dayWeek, 500);
setInterval(changeLanguage, 500);
setDegree();
setInterval(clockDate, 1000);
clockDate();
initUserData();
initWeather();
