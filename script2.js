document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("weatherData"));

    if (!data) {
        document.getElementById("weatherDisplay").innerHTML = "<p>Error loading weather data.</p>";
        return;
    }

    let celsiusTemp =Math.floor( data.main.temp);
    let fahrenheitTemp =(celsiusTemp * 9/5) + 32;
    let feelsLikeCelsius = data.main.feels_like;
    let feelsLikeFahrenheit = (feelsLikeCelsius * 9/5) + 32;

    const customIcons = {
        "Clear": "icons/sunny.svg",
        "Clouds": "icons/cloudy.svg",
        "Rain": "icons/rainy.svg",
        "Snow": "icons/snowy.svg",
        "Thunderstorm": "icons/storm.svg",
        "Mist": "icons/mist.svg"
    };

    const condition = data.weather[0].main;
    const iconUrl = customIcons[condition] || "sunny.png";

    document.getElementById("weatherDisplay").innerHTML = `
        <button id="unitToggle">C</button>
        <div id="icon">  <img id="weather-icon" src="${iconUrl}" alt="Weather Icon"> </div>
        <h2>${data.name}, ${data.sys.country}</h2>
        <p id = "temp"><span id="tempValue">${celsiusTemp}°C</span></p>
        <p id = "codn">${data.weather[0].description}</p>
        <div id = "gridForItem"> 
        <div class="boxs" id= "one">
        <img src="./svg/feel.svg" alt="" width="30px>
        <p id="feelsLikeValue">Feels Like </br> ${feelsLikeCelsius}°C</p>
        </div>
        <div class="boxs">
        <img src="./svg/wind.svg" alt="" width="25px">
        <p>Wind Speed</p>
        <p>${data.wind.speed} m/s</p></div>
        <div class="boxs">
        <img src="./svg/hum.svg" alt="" width="25px">
        <p>Humidity</p>
        <p>${data.main.humidity}%</p>
        </div>
        <div class="boxs">
        <img src="./svg/pressure.svg" alt="" width="25px">
        <p>Pressure</p>
        <p>${data.main.pressure} m/s</p>
        </div>
        </div>
        
    `;
    document.getElementById("unitToggle").addEventListener("click", () => {
        let tempElement = document.getElementById("tempValue");
        let feelsLikeElement = document.getElementById("feelsLikeValue");

        if (tempElement.innerText.includes("°C")) {
            tempElement.innerText = `${fahrenheitTemp.toFixed(2)}°F`;
            feelsLikeElement.innerText = `${feelsLikeFahrenheit.toFixed(2)}°F`;
            document.getElementById("unitToggle").innerText = "C";
        } else {
            tempElement.innerText = `${celsiusTemp}°C`;
            feelsLikeElement.innerText = `${feelsLikeCelsius}°C`;
            document.getElementById("unitToggle").innerText = "F";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let lat = localStorage.getItem("userLatitude");
    let lon = localStorage.getItem("userLongitude");

    if (lat && lon) {
        getWeatherByLocation(lat, lon);
    } else {
        console.log("No location data found.");
    }
});

function getWeatherByLocation(lat, lon) {
    let apiKey = "b89604eb4eec1381ba92159bc58350e1";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error("Error fetching location weather:", error));
}


