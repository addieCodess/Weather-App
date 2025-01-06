

function getWeatherData(city = "Mumbai") {
    const apiKey = "9a243e9b0062776d9e2616185276f8ad";  // Replace with your OpenWeatherMap API key
    const weatherDataEl = document.getElementById("weather-data");

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherInfo = `Weather in ${data.name}: ${data.weather[0].description}, Temperature: ${data.main.temp}°C`;
                weatherDataEl.textContent = weatherInfo;
            } else {
                weatherDataEl.textContent = "Error fetching weather data.";
            }
        })
        .catch(error => {
            weatherDataEl.textContent = "Error fetching weather data.";
            console.error("Error fetching weather:", error);
        });
}

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (username && password) {
        const user = { username, password };

        
        localStorage.setItem("user", JSON.stringify(user));

        document.getElementById("login-section").style.display = "none";
        document.getElementById("weather-section").style.display = "block";

 
        getWeatherData();
    } else {
        alert("Please enter both username and password.");
    }
});


document.getElementById("logout-btn").addEventListener("click", function () {
 
    localStorage.removeItem("user");
    document.getElementById("login-section").style.display = "block";
    document.getElementById("weather-section").style.display = "none";
});


const storedUser = localStorage.getItem("user");
if (storedUser) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("weather-section").style.display = "block";
    getWeatherData(); 
} else {
    document.getElementById("login-section").style.display = "block";
    document.getElementById("weather-section").style.display = "none";
}
