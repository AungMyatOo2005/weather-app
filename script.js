const key = "c44a49f7ef68185074cb2a588c0bb64a";
const search = document.getElementById("search");
const form = document.querySelector("form");
const weatherParent = document.getElementById("weather");
async function getData(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?unique=metrixc&q=${cityName}`;
  try {
    const res = await fetch(url + `&appid=${key}`);
    if(res.ok){
      const resData = await res.json();
      weather(resData);
      console.log(resData)
    }else{
      errorCity(cityName)
      console.log("error at city name")
    }
  } catch (err) {
    console.log(err.message);
    failFetch()
  }
}
function weather(data) {
  const celsius= data.main.temp-273.15.toFixed(2);
  function getImg() {
    if (data.weather[0].main == "Rain") {
      return "./images/rain.png";
    } else if (data.weather[0].main == "Clouds") {
      return "./images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      return "./images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      return "./images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      return "./images/mist.png";
    }
  }
  const weatherEl = `
      <div class="weather">
        <img src=${getImg()} alt="" class="weather-icon" />
        <h1 class="temp">${Math.round(celsius)}°C</h1>
        <h2 class="city">${data.name}</h2>
        <div class="detail">
          <div class="col">
          <img src="./images/humidity.png" alt="" />
          <div>
          <p class="humidity">${data.main.humidity}%</p>
          <p>Humidity</p>
            </div>
          </div>
          <div class="col">
          <img src="./images/wind.png" alt="" />
          <div>
          <p class="wind">${data.wind.speed}km/h</p>
          <p>Wind speed</p>
          </div>
          </div>
          </div>
          </div>
          `;
  weatherParent.innerHTML = weatherEl;
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  cityName = search.value.trim();
  if (cityName.length > 0) {
    getData(cityName);
    weatherParent.innerHTML = "";
    search.value = "";
  }
});


function errorCity(city){
  weatherParent.innerHTML=`<h1 class="error">${city} is not found</h1>`
}
function failFetch(){
  weatherParent.innerHTML = `<h1 class="error">Fail to Fetch</h1>`;
}