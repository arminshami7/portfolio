// Get HTML elements
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const cityNameDisplay = document.getElementById('city-name');
const temperatureDisplay = document.getElementById('temperature');
const conditionDisplay = document.getElementById('condition');
const errorMessageDisplay = document.getElementById('error-message');
const weatherIconDisplay = document.getElementById('weather-icon');
const loadingMessageDisplay = document.getElementById('loading-message')
const localTimeDisplay = document.getElementById('local-time');

// API information
// Replace 'YOUR_API_KEY_HERE' with your actual API key from OpenWeatherMap!
const API_KEY = 'd0f78370e661c6fb3310543344ac87dc'; // <--- IMPORTANT: Replace this line!
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data from OpenWeatherMap
async function fetchWeatherData(city) {
    errorMessageDisplay.textContent = ''; // Clear previous error message
    cityNameDisplay.textContent = '';
    temperatureDisplay.textContent = '';
    conditionDisplay.textContent = '';
    localTimeDisplay.textContent = '';

    // Construct the full API URL
    // Using 'units=metric' for Celsius. Removed 'lang=fa' for pure English output.
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    console.log(`Searching weather for ${city} from API...`);

    try { 
        const response = await fetch(url); 

        // Step 1: Check HTTP status
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`City "${city}" not found. Please enter a valid city name.`);
            }
            throw new Error(`Server error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json(); 

        // Step 2: Check JSON data for logical errors and extract information
        if (data.cod && data.cod !== 200) {
            throw new Error(`API error: ${data.message}`);
        }

        const cityName = data.name;
        const temperature = `${Math.round(data.main.temp)}°C`;
        const condition = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const timezoneOffset = data.timezone;

        // Calculate local time (همین کد قبلی شما اینجاست)
        const utc_timestamp_milliseconds = new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000);
        const local_timestamp_milliseconds = utc_timestamp_milliseconds + (timezoneOffset * 1000);
        const localTime = new Date(local_timestamp_milliseconds);
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        const formattedLocalTime = localTime.toLocaleString('en-US', options);

        return { cityName, temperature, condition, iconCode, formattedLocalTime };

    } catch (error) { 
        console.error("Error in fetchWeatherData:", error);
        throw error; 
    }
}

// Add Event Listener to the search button
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {

        weatherIconDisplay.style.display = 'none';
        weatherIconDisplay.src = '';
        loadingMessageDisplay.style.display = 'block';
        fetchWeatherData(city)
            .then(weatherData => {
                loadingMessageDisplay.style.display = 'none';
                cityNameDisplay.textContent = `City: ${weatherData.cityName}`;
                temperatureDisplay.textContent = `Temperature: ${weatherData.temperature}`;
                conditionDisplay.textContent = `Condition: ${weatherData.condition}`;
                localTimeDisplay.textContent = `Local Time: ${weatherData.formattedLocalTime}`;
                const iconUrl = `https://openweathermap.org/img/wn/${weatherData.iconCode}@2x.png`;
                weatherIconDisplay.src = iconUrl;
                weatherIconDisplay.style.display = 'block';
            })
            .catch(error => {
                 loadingMessageDisplay.style.display = 'none';
                errorMessageDisplay.textContent = error.message;
                console.error("Error fetching weather:", error);
                weatherIconDisplay.style.display = 'none';
            });
    } else {
        errorMessageDisplay.textContent = "Please enter a city name.";
        weatherIconDisplay.style.display = 'none';
        localTimeDisplay.textContent = ''
        loadingMessageDisplay.style.display = 'none';
    }
});
