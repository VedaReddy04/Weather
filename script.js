const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const weather_body = document.querySelector('.weather-body');
const activitySuggestions = document.getElementById('activity-suggestions');
const locationDisplay = document.querySelector('.location');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;

recognition.onresult = function(event) {
    const city = event.results[0][0].transcript;
    inputBox.value = city;
    checkWeather(city);
};

recognition.onerror = function(event) {
    console.error('Error occurred in recognition:', event.error);
};

voiceBtn.addEventListener('click', () => {
    recognition.start();
});

document.addEventListener('DOMContentLoaded', () => {
    updateBackground('default');
});

async function checkWeather(city) {
    const apiKey = "643ea15da8a4d042df7f2c5fa452a7da";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if(weather_data.cod === `404`){
        weather_body.style.display = "none";
        alert("City not found. Please enter a valid location.");
        inputBox.value = "";
        document.querySelector('.location').innerText = "";
        updateBackground('default');
        return;
    }
    

    console.log("run");
    weather_body.style.display = "flex";
    locationDisplay.innerHTML = `${weather_data.name}`;
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    updateBackground(weather_data.weather[0].main);
    suggestActivities(weather_data.weather[0].main);

    switch (weather_data.weather[0].main){
        case 'Cloud' :
        case 'Clouds':
            weather_img.src = "assets/cloud.png";
            break;
        case 'Clear':
        case 'Sunny':
            weather_img.src = "assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "assets/mist.png";
            break;
        case 'Haze':
            weather_img.src = "assets/haze.png";
            break;
        case 'Snow':
            weather_img.src = "assets/snow.png";
            break;

    }

    console.log(weather_data);
    inputBox.value = "";
}

function suggestActivities(weatherCondition) {
    let activitySuggestionsText;

    switch (weatherCondition) {
        case 'Clear':
        case 'Sunny':
            activitySuggestionsText = "Great day for a picnic or a hike!";
            break;
        case 'Rain':
            activitySuggestionsText = "Perfect time to read a book or watch a movie!";
            break;
        case 'Snow':
            activitySuggestionsText = "How about skiing or building a snowman?";
            break;
        case 'Haze':
            activitySuggestionsText = "A perfect time for cozy indoor activities like reading or crafting!";
            break;
        case 'Mist':
            activitySuggestionsText = "A foggy day—stay cozy indoors with a warm drink!";
            break;
        case 'Cloud':
        case 'Clouds':
            activitySuggestionsText = "It's a cozy day—perfect for taking a stroll, grabbing a coffee, or enjoying some quiet indoor time.";
            break;
        default:
            activitySuggestionsText = "Enjoy your day, whatever you do!";
    }

    activitySuggestions.innerText = activitySuggestionsText;
}

function updateBackground(condition) {
    const body = document.body;

    body.style.backgroundImage = "";
    body.style.backgroundColor = "";

    switch (condition) {
        case 'Clear':
        case 'Sunny':
            body.style.backgroundImage = "url('assets/clear1.png')";
            break;
        case 'Rain':
            body.style.backgroundImage = "url('assets/rain1.png')";
            break;
        case 'Snow':
            body.style.backgroundImage = "url('assets/snow1.png')";
            break;
        case 'Haze':
            body.style.backgroundImage = "url('assets/haze1.png')";
            break;
        case 'Mist':
            body.style.backgroundImage = "url('assets/mist1.png')";
            break;
        case 'Cloud':
        case 'Clouds':
            body.style.backgroundImage = "url('assets/cloud1.png')";
            break;
        default:
            body.style.backgroundImage = "url('assets/default.png')";
    }

    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
    body.style.height = "100vh";
}

searchBtn.addEventListener('click', () => {
    if (inputBox.value.trim() !== "") {
        checkWeather(inputBox.value);
    } else {
        alert("Please enter a location.");
    }
});