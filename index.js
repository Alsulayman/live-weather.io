const api = process.env.API_KEY;


const mainDivEl = document.getElementById("main-div");

const cityNameEl = document.getElementById("city-name");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityNameEl.value;
  fetchWeatherData(cityValue);
});

async function fetchWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${api}&units=metric`
    );

    const data = await response.json();
    console.log(data);



    const temperature = "Temperature in Celsius:" + " " + data.main.temp + " " + "°C";

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const details = "Humidity is:" + " " + data.main.humidity + "%"
    const fah = "Temperature in Fahrenheit:" + " " + (data.main.temp * 9 / 5 + 32) + " " + "°F"
    const kel = "Temperature in Kelvin:" + " " + (data.main.temp + 273.15) + " " + "k"

    mainDivEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    mainDivEl.querySelector(".temperature").textContent = temperature;
    mainDivEl.querySelector(".description").textContent = description;
    mainDivEl.querySelector(".details").textContent = details;
    mainDivEl.querySelector(".fahrenheit").textContent = fah;
    mainDivEl.querySelector(".kelvin").textContent = kel;
  } catch (error) {
    mainDivEl.querySelector(".icon").innerHTML = "";
    mainDivEl.querySelector(".temperature").textContent = "";
    mainDivEl.querySelector(".description").textContent =
      "No City was found on the Server ";
    mainDivEl.querySelector(".fahrenheit").textContent = "";
    mainDivEl.querySelector(".kelvin").textContent = "";

    mainDivEl.querySelector(".details").innerHTML =
      "<img src='https://cdn-icons-png.flaticon.com/512/5201/5201284.png' width='50px' height='50px'>";
  }
}
