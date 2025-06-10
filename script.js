document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    getWeather(city);
});

async function getWeather(city) {
    const apiKey = 'b89604eb4eec1381ba92159bc58350e1';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        localStorage.setItem("weatherData", JSON.stringify(data));
        window.location.href = "index2.html";
    } 
    catch (error) {
        console.log('Error fetching data:', error);
    }
}

document.getElementById('locationBtn').addEventListener('click', () => {
    getUserLocation();
});

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            localStorage.setItem("userLatitude", lat);
            localStorage.setItem("userLongitude", lon);

            window.location.href = "index2.html";
        }, error => {
            console.log("Geolocation error:", error);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}


