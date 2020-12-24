renderBackground();
setInterval(clockDate, 50000);
clockDate();
getLocation();
initMap();


//--WEATHER--//

function getLocation() {
// if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
        function (position) {
          let { latitude } = position.coords;
          let { longitude } = position.coords;
        //   const key = 'd2c04de69ed62d66d08538028617ce18';
        //   let apiWeatherCurrent = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
        //   let apiLocationLatLon = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${key}`;
        //   let apiWeatherForecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`;
        //   document.querySelector('.map-area__lat')
        //       .textContent = `Latitude: ${Math.round(latitude)}° `;
        //   document.querySelector('.map-area__lng')
        //       .textContent = `Longitude: ${Math.round(longitude)}° `;
 
  
    // fetch(apiLocationLatLon)
    //     .then(function (resp) {
    //         return resp.json();
    //     })
    //     .then(function (data) {
    //         document.querySelector('.location-date__city')
    //             .textContent = `${data[3].name}, ${data[3].country}`;
    //     });  
  

    // fetch(apiWeatherCurrent)
    //     .then(function (resp) {
    //         return resp.json();
    //     })
    //     .then(function (data) {
    //         console.log(data);
    //         document.querySelector(
    //             ".weather__current--temperature"
    //         ).innerHTML = Math.round(data.main.temp - 273);
    //         document.querySelector(
    //             ".weather__current--icon"
    //         ).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
    //         document.querySelector(".details__clouds").textContent =
    //             data.weather[0]["description"];
    //         document.querySelector(
    //             ".details__feels"
    //         ).textContent = `FEELS LIKE: ${Math.round(
    //             data.main.feels_like - 273
    //         )}`;
    //         document.querySelector(
    //             ".details__wind"
    //         ).textContent = `WIND: ${data.wind.speed}`;
    //         document.querySelector(
    //             ".details__humidity"
    //         ).textContent = `HUMIDITY: ${data.main.humidity}`;
      
        //     document.getElementById('farenheit').addEventListener('click', () => {
        //         document.querySelector(".weather__current--temperature").innerHTML = `${Math.round((data.main.temp - 273) * 9 / 5 + 32)}`;
        //         document.querySelector(".details__feels"
        //       ).textContent = `FEELS LIKE: ${Math.round((data.main.feels_like - 273) * 9 / 5 + 32)}`;
        //       document.querySelector(
        //         '.weather__forecast--temperature-1'
        //     ).innerHTML = `${Math.round((data.list[1].main.temp - 273) * 9 / 5 + 32)}&deg`;
        //     document.querySelector(
        //         '.weather__forecast--temperature-2'
        //     ).innerHTML = `${Math.round((data.list[2].main.temp - 273) * 9 / 5 + 32)}&deg`;
        //         document.querySelector(
        //             '.weather__forecast--temperature-3'
        //         ).innerHTML = `${Math.round((data.list[3].main.temp - 273) * 9 / 5 + 32)}&deg`;
            
        //     })
        //     document.getElementById('celsius').addEventListener('click', () => {
        //         document.querySelector(".weather__current--temperature").innerHTML = `${Math.round(data.main.temp - 273)}`;
        //         document.querySelector(".details__feels"
        //         ).textContent = `FEELS LIKE: ${Math.round(data.main.feels_like - 273)}`;
        //         document.querySelector(
        //             '.weather__forecast--temperature-1'
        //         ).innerHTML = `${Math.round(data.list[1].main.temp - 273)}&deg`;
        //         document.querySelector(
        //             '.weather__forecast--temperature-2'
        //         ).innerHTML = `${Math.round(data.list[2].main.temp - 273)}&deg`;
        //         document.querySelector(
        //             '.weather__forecast--temperature-3'
        //         ).innerHTML = `${Math.round(data.list[3].main.temp - 273)}&deg`;
        //   });
            
            
        });
          
    // fetch(apiWeatherForecast)
    //     .then(function (resp) {
    //                 return resp.json();
    //     })
    //     .then(function (data) {
    //                 console.log(data);
    //                 const week = [
    //                     'Sunday',
    //                     'Monday',
    //                     'Tuesday',
    //                     'Wednesday',
    //                     'Thursday',
    //                     'Friday',
    //                     'Saturday',
    //                 ];
    //                 let today = new Date();
    //                 let day = today.getDay();
      
    //                 day++;
    //                 if (day > week.length - 1) day = 0;
      
    //                 document.querySelector('.weather__forecast--day-1').textContent = week[day];
    //                 day++;
    //                 if (day > week.length - 1) day = 0;
    //                 document.querySelector('.weather__forecast--day-2').textContent = week[day];
    //                 day++;
    //                 if (day > week.length - 1) day = 0;
    //                 document.querySelector('.weather__forecast--day-3').textContent = week[day];
                
    //                 document.querySelector('.weather__forecast--temperature-1').innerHTML = `${Math.round(data.list[1].main.temp - 273)}&deg`;
    //                 document.querySelector('.weather__forecast--temperature-2').innerHTML = `${Math.round(data.list[2].main.temp - 273)}&deg`;
    //                 document.querySelector('.weather__forecast--temperature-3').innerHTML = `${Math.round(data.list[3].main.temp - 273)}&deg`;

    //                 document.querySelector('.weather__forecast--icon-1').innerHTML =
    //                     `<img src="http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png">`;
    //                 document.querySelector('.weather__forecast--icon-2').innerHTML =
    //                     `<img src="http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png">`;
    //                 document.querySelector('.weather__forecast--icon-3').innerHTML =
    //                     `<img src="http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png">`;
    //                 document.querySelector('.location-date__city')
    //                     .textContent = `${data[3].name}, ${data[3].country}`;


        //             document.getElementById('farenheit')
        //                 .addEventListener('click', () => {
        //                     document.querySelector(
        //                         '.weather__forecast--temperature-1'
        //                     ).innerHTML = `${Math.round((data.list[1].main.temp - 273) * 9 / 5 + 32)}&deg`;
        //                     document.querySelector(
        //                         '.weather__forecast--temperature-2'
        //                     ).innerHTML = `${Math.round((data.list[2].main.temp - 273) * 9 / 5 + 32)}&deg`;
        //                     document.querySelector(
        //                         '.weather__forecast--temperature-3'
        //                     ).innerHTML = `${Math.round((data.list[3].main.temp - 273) * 9 / 5 + 32)}&deg`;
                
        //                 });
                
        //             document.getElementById('celsius')
        //                 .addEventListener('click', () => {
        //                     document.querySelector(
        //                         '.weather__forecast--temperature-1'
        //                     ).innerHTML = `${Math.round(data.list[1].main.temp - 273)}&deg`;
        //                     document.querySelector(
        //                         '.weather__forecast--temperature-2'
        //                     ).innerHTML = `${Math.round(data.list[2].main.temp - 273)}&deg`;
        //                     document.querySelector(
        //                         '.weather__forecast--temperature-3'
        //                     ).innerHTML = `${Math.round(data.list[3].main.temp - 273)}&deg`;
        //                 });
        // });   
          
        // .catch(function () {
        //   //catch any errors
        // });
    // },
    // function () {
    //   alert("Could not get your position");
    document.querySelector('.header__search-button').addEventListener('click', () => {
        let input = document.querySelector('.header__search--form');
        let address = input.value;
        const geocoding = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=bdca322080e3433b9f0e21d216562bea`; 
        fetch(geocoding)
            .then(function (resp) {
            return resp.json();
            }).
            then(function (data) {
                console.log(data);
        apiWeatherCurrent = `http://api.openweathermap.org/data/2.5/weather?lat=${data.results[0].geometry.lat}&lon=${data.results[0].geometry.lng}&appid=${key}`;
        apiLocationLatLon = `http://api.openweathermap.org/geo/1.0/reverse?lat=${data.results[0].geometry.lat}&lon=${data.results[0].geometry.lng}&limit=5&appid=${key}`;
        apiWeatherForecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${data.results[0].geometry.lat}&lon=${data.results[0].geometry.lng}&appid=${key}`;
        fetch(apiLocationLatLon)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            document.querySelector('.location-date__city')
                .textContent = `${data[3].name}, ${data[3].country}`;
        });  
  

    // fetch(apiWeatherCurrent)
    //     .then(function (resp) {
    //         return resp.json();
    //     })
    //     .then(function (data) {
    //         console.log(data);
    //         document.querySelector(
    //             ".weather__current--temperature"
    //         ).innerHTML = Math.round(data.main.temp - 273);
    //         document.querySelector(
    //             ".weather__current--icon"
    //         ).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
    //         document.querySelector(".details__clouds").textContent =
    //             data.weather[0]["description"];
    //         document.querySelector(
    //             ".details__feels"
    //         ).textContent = `FEELS LIKE: ${Math.round(
    //             data.main.feels_like - 273
    //         )}`;
    //         document.querySelector(
    //             ".details__wind"
    //         ).textContent = `WIND: ${data.wind.speed}`;
    //         document.querySelector(
    //             ".details__humidity"
    //         ).textContent = `HUMIDITY: ${data.main.humidity}`;
      
    //         document.getElementById('farenheit').addEventListener('click', () => {
    //             document.querySelector(".weather__current--temperature").innerHTML = `${Math.round((data.main.temp - 273) * 9 / 5 + 32)}`;
    //             document.querySelector(".details__feels"
    //           ).textContent = `FEELS LIKE: ${Math.round((data.main.feels_like - 273) * 9 / 5 + 32)}`;
    //         })
    //         document.getElementById('celsius').addEventListener('click', () => {
    //             document.querySelector(".weather__current--temperature").innerHTML = `${Math.round(data.main.temp - 273)}`;
    //             document.querySelector(".details__feels"
    //           ).textContent = `FEELS LIKE: ${Math.round(data.main.feels_like - 273)}`;
    //       });
            
            
    //     });
          
    // fetch(apiWeatherForecast)
    //     .then(function (resp) {
    //                 return resp.json();
    //     })
    //     .then(function (data) {
    //                 console.log(data);
    //                 const week = [
    //                     'Sunday',
    //                     'Monday',
    //                     'Tuesday',
    //                     'Wednesday',
    //                     'Thursday',
    //                     'Friday',
    //                     'Saturday',
    //                 ];
    //                 let today = new Date();
    //                 let day = today.getDay();
      
    //                 day++;
    //                 if (day > week.length - 1) day = 0;
      
    //                 document.querySelector('.weather__forecast--day-1').textContent = week[day];
    //                 day++;
    //                 if (day > week.length - 1) day = 0;
    //                 document.querySelector('.weather__forecast--day-2').textContent = week[day];
    //                 day++;
    //                 if (day > week.length - 1) day = 0;
    //                 document.querySelector('.weather__forecast--day-3').textContent = week[day];
                
    //                 document.querySelector('.weather__forecast--temperature-1').innerHTML = `${Math.round(data.list[1].main.temp - 273)}&deg`;
    //                 document.querySelector('.weather__forecast--temperature-2').innerHTML = `${Math.round(data.list[2].main.temp - 273)}&deg`;
    //                 document.querySelector('.weather__forecast--temperature-3').innerHTML = `${Math.round(data.list[3].main.temp - 273)}&deg`;

    //                 document.querySelector('.weather__forecast--icon-1').innerHTML =
    //                     `<img src="http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png">`;
    //                 document.querySelector('.weather__forecast--icon-2').innerHTML =
    //                     `<img src="http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png">`;
    //                 document.querySelector('.weather__forecast--icon-3').innerHTML =
    //                     `<img src="http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png">`;
    //                 document.querySelector('.location-date__city')
    //                     .textContent = `${data[3].name}, ${data[3].country}`;


//                     document.getElementById('farenheit')
//                         .addEventListener('click', () => {
//                             document.querySelector(
//                                 '.weather__forecast--temperature-1'
//                             ).innerHTML = `${Math.round((data.list[1].main.temp - 273) * 9 / 5 + 32)}&deg`;
//                             document.querySelector(
//                                 '.weather__forecast--temperature-2'
//                             ).innerHTML = `${Math.round((data.list[2].main.temp - 273) * 9 / 5 + 32)}&deg`;
//                             document.querySelector(
//                                 '.weather__forecast--temperature-3'
//                             ).innerHTML = `${Math.round((data.list[3].main.temp - 273) * 9 / 5 + 32)}&deg`;
                
//                         });
                
//                     document.getElementById('celsius')
//                         .addEventListener('click', () => {
//                             document.querySelector(
//                                 '.weather__forecast--temperature-1'
//                             ).innerHTML = `${Math.round(data.list[1].main.temp - 273)}&deg`;
//                             document.querySelector(
//                                 '.weather__forecast--temperature-2'
//                             ).innerHTML = `${Math.round(data.list[2].main.temp - 273)}&deg`;
//                             document.querySelector(
//                                 '.weather__forecast--temperature-3'
//                             ).innerHTML = `${Math.round(data.list[3].main.temp - 273)}&deg`;
//                         });
//         });       
//         });  
//     });    
//     }
//   );
// }

function map() {
    let map;
    let latt;
    let long;
    navigator.geolocation.getCurrentPosition((positions) => {
        long = positions.coords.longitude;
        latt = positions.coords.latitude;

    // mapboxgl.accessToken = 'pk.eyJ1IjoibHVlMjEiLCJhIjoiY2tpdzV5bmM2MHJ6ejMwbnozbmE0aDhkaiJ9.WU_nweukjgiOyA7Juh20nQ';
    // map = new mapboxgl.Map({
    //     container: 'map',
    //     style: 'mapbox://styles/mapbox/streets-v11',
    //     center: [long, latt], // starting position [lng, lat]
    //     zoom: 9
    // });
    });
    document.querySelector('.header__search-button').addEventListener('click', () => {
        let input = document.querySelector('.header__search--form');
        let address = input.value;
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
                
                 apiWeatherCurrent = `http://api.openweathermap.org/data/2.5/weather?lat=${data.results[0].geometry.lat}&lon=${data.results[0].geometry.lng}&appid=${key}`;
                 apiLocationLatLon = `http://api.openweathermap.org/geo/1.0/reverse?lat=${data.results[0].geometry.lat}&lon=${data.results[0].geometry.lng}&limit=5&appid=${key}`;
                 apiWeatherForecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${data.results[0].geometry.lat}&lon=${data.results[0].geometry.lng}&appid=${key}`;
                
                document.querySelector('.map-area__lat')
                .textContent = `Latitude: ${Math.round(data.results[0].geometry.lat)}° `;
                document.querySelector('.map-area__lng')
                .textContent = `Longitude: ${Math.round(data.results[0].geometry.lng)}° `;
        });  
    });
}

// input = document.querySelector(".header__search--form");
// input.addEventListener("keyup", function(event) {
//   if (event.keyCode === 13) {
//    event.preventDefault();
//    document.querySelector(".header__search-button").click();
//   }
// });

//--DATE--//
// function clockDate() {
//     const date = document.querySelector(".location-date__date");
//     const time = document.querySelector(".location-time");
//     let now = new Date(),
//         hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours(),
//         minutes =
//             now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes(),
//         weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//         month = ["January", "February", "March", "Aplil", "May",
//             "June", "July", "August", "Semtembre",
//             "Octobre", "November", "December"];

//     time.innerHTML = hours + ":" + minutes;
//     date.textContent = `${weekday[now.getDay()]} 
//                         ${now.getDate()} 
//                         ${month[now.getMonth()]}`;
// }
// function renderBackground() {
//     fetch('https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=tJdVJxD140-P3Phv2uKMuOHpswNoGoxMWavWyVbzTK0')
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {
//             document.body.style.backgroundImage = `linear-gradient(
//                 180deg,
//                 rgba(8, 15, 26, 0.59) 0%,
//                 rgba(58, 58, 129, 0.46) 100%
//               ), url(${data.urls.regular})`;
//             document.body.style.backgroundRepeat = "no-repeat";
//             document.body.style.backgroundSize = "cover";
//         });
// }

// const refreshButton = document.querySelector('.header__buttons--refresh');
// refreshButton.addEventListener('click', renderBackground);
