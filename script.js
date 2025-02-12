// Navigation for all pages
const navContent = `
<nav>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="forecast.html">Forecast</a></li>
        <li><a href="settings.html">Settings</a></li>
        <li><a href="alerts.html">Weather Alerts</a></li>
    </ul>
</nav>
`;

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("nav-container").innerHTML = navContent;
});

// Weather API
const apiKey = 'YOUR_API_KEY'; // Replace with a valid API key
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather(city) {
    try {
        const response = await fetch(`${weatherApiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = `${data.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
    }
});

navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    fetch(`${weatherApiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching location-based weather:', error));
});
