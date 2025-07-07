  // --- Weather Icons by condition code (Open-Meteo)
    const weatherIcons = {
      0: "☀️ Clear sky",
      1: "🌤️ Mainly clear",
      2: "⛅ Partly cloudy",
      3: "☁️ Overcast",
      45: "🌫️ Fog",
      48: "🌫️ Depositing fog",
      51: "🌦️ Drizzle",
      53: "🌧️ Moderate drizzle",
      55: "🌧️ Heavy drizzle",
      61: "🌧️ Rain",
      63: "🌧️ Moderate rain",
      65: "🌧️ Heavy rain",
      71: "❄️ Snow",
      73: "❄️ Moderate snow",
      75: "❄️ Heavy snow",
      95: "⛈️ Thunderstorm",
      96: "⛈️ Thunder w/ hail",
      99: "⛈️ Severe thunder"
    };

    // --- Real-time clock
    function updateDateTime() {
      const now = new Date();
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      const date = now.toLocaleDateString(undefined, options);
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      document.getElementById("datetime").innerHTML = `📅 ${date} ⏰ ${time}`;
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // --- Fetch location name using reverse geocoding
    async function getLocationName(lat, lon) {
      try {
        const res = await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`);
        const data = await res.json();
        const city = data.address.city || data.address.town || data.address.village || data.address.state || "your location";
        return city;
      } catch {
        return "your area";
      }
    }

    // --- Fetch weather and show full details
    async function fetchWeather(lat, lon) {
      try {
        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const res = await fetch(weatherURL);
        const data = await res.json();
        const weather = data.current_weather;
        const tempC = weather.temperature;
        const wind = weather.windspeed;
        const code = weather.weathercode;
        const icon = weatherIcons[code] || "🌈";

        const locationName = await getLocationName(lat, lon);

        // Optional: convert to Fahrenheit for US users
        const isUS = navigator.language.startsWith("en-US");
        const temp = isUS ? `${Math.round((tempC * 9/5) + 32)}°F` : `${tempC}°C`;

        document.getElementById("weather").innerHTML =
          `${icon} ${locationName} | 🌡️ ${temp} | 💨 ${wind} km/h`;
      } catch (err) {
        console.error("Weather Error:", err);
        document.getElementById("weather").textContent = "⚠️ Unable to load weather data";
      }
    }

    // --- Get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          fetchWeather(pos.coords.latitude, pos.coords.longitude);
        },
        err => {
          document.getElementById("weather").textContent = "📍 Location access denied";
        }
      );
    } else {
      document.getElementById("weather").textContent = "❌ Geolocation not supported";
    }