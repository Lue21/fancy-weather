//--DATE--//

const date = document.querySelector(".location-date__date");
const time = document.querySelector(".location-time");

function clockDate() {
  let now = new Date(),
    hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours(),
    minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes(),
    weekday = [],
    month = [];

  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "Aplil";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "Semtembre";
  month[9] = "Octobre";
  month[10] = "November";
  month[11] = "December";

  time.innerHTML = hours + ":" + minutes;
  date.textContent = `${weekday[now.getDay()]} 
                    ${now.getDate()} 
                    ${month[now.getMonth()]}`;
}
setInterval(clockDate, 50000);
clockDate();



//--WEATHER--//

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
      function (position) {
          const { latitude } = position.coords;
          const { longitude } = position.coords;
          const key = 'd2c04de69ed62d66d08538028617ce18';
          const apiWeatherCurrent = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
          const apiLocationLatLon = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${key}`;
          const apiWeatherForecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`;
          document.querySelector('.map-area__lat')
              .textContent = `Latitude: ${Math.round(latitude)}° `;
          document.querySelector('.map-area__lng')
              .textContent = `Longitude: ${Math.round(longitude)}° `;
         
          
          
          
    fetch(apiLocationLatLon)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            document.querySelector('.location-date__city')
                .textContent = `${data[3].name}, ${data[3].country}`;
        });  
  

          fetch(apiWeatherCurrent)
              .then(function (resp) {
                  return resp.json();
              })
              .then(function (data) {
                  console.log(data);
                  document.querySelector(
                      ".weather__current--temperature"
                  ).innerHTML = Math.round(data.main.temp - 273);
                  document.querySelector(
                      ".weather__current--icon"
                  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
                  document.querySelector(".details__clouds").textContent =
                      data.weather[0]["description"];
                  document.querySelector(
                      ".details__feels"
                  ).textContent = `FEELS LIKE: ${Math.round(
                      data.main.feels_like - 273
                  )}`;
                  document.querySelector(
                      ".details__wind"
                  ).textContent = `WIND: ${data.wind.speed}`;
                  document.querySelector(
                      ".details__humidity"
                  ).textContent = `HUMIDITY: ${data.main.humidity}`;
            
                  document.getElementById('farenheit').addEventListener('click', () => {
                      document.querySelector(".weather__current--temperature").innerHTML = `${Math.round((data.main.temp - 273) * 9 / 5 + 32)}`;
                  });
                  document.getElementById('celsius').addEventListener('click', () => {
                    document.querySelector(".weather__current--temperature").innerHTML = `${Math.round(data.main.temp - 273)}`;
                });
            
            
        });
          
        fetch(apiWeatherForecast)
        .then(function (resp) {
          return resp.json();
        }) 
            .then(function (data) {
                console.log(data);
                const week = [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                  ];
                  let today = new Date();
                  let day = today.getDay();
      
                  day++;
                  if (day > week.length - 1) day = 0;
      
                  document.querySelector('.weather__forecast--day-1').textContent = week[day];
                  day++;
                  if (day > week.length - 1) day = 0;
                  document.querySelector('.weather__forecast--day-2').textContent = week[day];
                  day++;
                  if (day > week.length - 1) day = 0;
                document.querySelector('.weather__forecast--day-3').textContent = week[day];
                
                document.querySelector('.weather__forecast--temperature-1').innerHTML = `${Math.round(data.list[1].main.temp - 273)}&deg`;
                document.querySelector('.weather__forecast--temperature-2').innerHTML = `${Math.round(data.list[2].main.temp - 273)}&deg`;
                document.querySelector('.weather__forecast--temperature-3').innerHTML = `${Math.round(data.list[3].main.temp - 273)}&deg`;

                document.querySelector('.weather__forecast--icon-1').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png">`;
                document.querySelector('.weather__forecast--icon-2').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png">`;
                document.querySelector('.weather__forecast--icon-3').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png">`;



                document.getElementById('farenheit')
              .addEventListener('click', () => {
                document.querySelector(
                  '.weather__forecast--temperature-1'
                ).innerHTML = `${Math.round((data.list[1].main.temp - 273) * 9 / 5 + 32)}&deg`;
                document.querySelector(
                  '.weather__forecast--temperature-2'
                ).innerHTML = `${Math.round((data.list[2].main.temp - 273) * 9 / 5 + 32)}&deg`;
                document.querySelector(
                  '.weather__forecast--temperature-3'
                ).innerHTML = `${Math.round((data.list[3].main.temp - 273) * 9 / 5 + 32)}&deg`;
                
              });
                
              document.getElementById('celsius')
              .addEventListener('click', () => {
                document.querySelector(
                  '.weather__forecast--temperature-1'
                ).innerHTML = `${Math.round(data.list[1].main.temp - 273)}&deg`;
                document.querySelector(
                  '.weather__forecast--temperature-2'
                ).innerHTML = `${Math.round(data.list[2].main.temp - 273)}&deg`;
                document.querySelector(
                  '.weather__forecast--temperature-3'
                ).innerHTML = `${Math.round(data.list[3].main.temp - 273)}&deg`;
              });
        })    
          
        .catch(function () {
          //catch any errors
        });
    },
    function () {
      alert("Could not get your position");
    }
  );
