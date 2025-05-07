const apiKey = "50160e6da5f627c2bf07cffce6c2bca7";
const maxCities = 10;
const weatherContainer = document.getElementById("weather-container");
const form = document.getElementById("location-form");
const input = document.getElementById("city-input");

let cities = JSON.parse(localStorage.getItem("cities")) || [];

function saveCities() {
	localStorage.setItem("cities", JSON.stringify(cities));
}

async function fetchWeather(city) {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
	);
	if (!response.ok) {
		throw new Error(`Nie znaleziono miasta: ${city}`);
	}
	return response.json();
}

function createWeatherCard(data, city) {
	const card = document.createElement("div");
	card.className = "weather-card";

	const icon = data.weather[0].icon;
	const imgSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;

	card.innerHTML = `
    <h3>${city}</h3>
    <img src="${imgSrc}" alt="pogoda">
    <p>${data.main.temp}°C</p>
    <p>Wilgotność: ${data.main.humidity}%</p>
    <button onclick="removeCity('${city}')">Usuń</button>
  `;

	weatherContainer.appendChild(card);
}

async function loadWeather() {
	weatherContainer.innerHTML = "";
	for (let city of cities) {
		try {
			const data = await fetchWeather(city);
			createWeatherCard(data, city);
		} catch (err) {
			console.error(err.message);
		}
	}
}

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const city = input.value.trim();
	if (!city || cities.includes(city) || cities.length >= maxCities) {
		input.value = "";
		return;
	}
	try {
		await fetchWeather(city);
		cities.push(city);
		saveCities();
		loadWeather();
	} catch (err) {
		alert(err.message);
	}
	input.value = "";
});

function removeCity(city) {
	cities = cities.filter((c) => c !== city);
	saveCities();
	loadWeather();
}

window.addEventListener("load", loadWeather);
