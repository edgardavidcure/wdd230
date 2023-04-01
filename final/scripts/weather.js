const apiKey = "582b55efa5e27910234adbbf3225cdad";
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Carlsbad&appid=${apiKey}`;

const day1Day = document.getElementById("day1-day");
const day2Day = document.getElementById("day2-day");
const day3Day = document.getElementById("day3-day");

const day1MinTemp = document.getElementById("day1-min-temp");
const day2MinTemp = document.getElementById("day2-min-temp");
const day3MinTemp = document.getElementById("day3-min-temp");

const day1MaxTemp = document.getElementById("day1-max-temp");
const day2MaxTemp = document.getElementById("day2-max-temp");
const day3MaxTemp = document.getElementById("day3-max-temp");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dates = [];
const forecastDays = [];

const currentTemperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-desc");
const humidityP = document.getElementById("humidity");

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

async function getForecastDays() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Filter the list of forecasts to only include the next three days
    const filteredForecasts = data.list.filter((forecast) => {
      const forecastDate = new Date(forecast.dt_txt);
      const now = new Date();
      const diffInDays =
        (forecastDate.getTime() - now.getTime()) / (1000 * 3600 * 24);
      return diffInDays >= 0 && diffInDays < 3;
    });

    // Map the list of forecast dates to names of the days of the week
    const forecastDays = filteredForecasts.map((forecast) => {
      const forecastDate = new Date(forecast.dt_txt);
      const dayOfWeek = daysOfWeek[forecastDate.getDay()];
      return dayOfWeek;
    });
    const threeDayForecast = data.list.filter((forecast) => {
      const forecastDate = new Date(forecast.dt * 1000);
      const now = new Date();
      const diffInDays =
        (forecastDate.getTime() - now.getTime()) / (1000 * 3600 * 24);
      return diffInDays >= 0 && diffInDays < 3;
    });

    const groupedByDate = {};
    threeDayForecast.forEach((forecast) => {
      const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString();
      if (!groupedByDate[forecastDate]) {
        groupedByDate[forecastDate] = [];
      }
      groupedByDate[forecastDate].push(forecast);
    });
    const avgTemperatures = {};
    Object.keys(groupedByDate).forEach((date) => {
      const forecasts = groupedByDate[date];
      const minTemperatures = forecasts.map(
        (forecast) => forecast.main.temp_min
      );
      const maxTemperatures = forecasts.map(
        (forecast) => forecast.main.temp_max
      );
      const avgMinTemperature = minTemperatures.length
        ? Math.round(
            minTemperatures.reduce((a, b) => a + b) / minTemperatures.length
          )
        : null;
      const avgMaxTemperature = maxTemperatures.length
        ? Math.round(
            maxTemperatures.reduce((a, b) => a + b) / maxTemperatures.length
          )
        : null;
      avgTemperatures[date] = {
        minTemperature: Math.min(...minTemperatures),
        maxTemperature: Math.max(...maxTemperatures),
        avgMinTemperature,
        avgMaxTemperature,
      };
    });

    const uniqueDays = [...new Set(forecastDays)];
    // Do something with the list of names of the days of the week
    drawWeatherForecast(uniqueDays, avgTemperatures);
    console.log(avgTemperatures);
  } catch (error) {
    console.error(error);
  }
}

async function getCurrentTemp() {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&appid=582b55efa5e27910234adbbf3225cdad"
  );
  const data = await response.json();
  const currentTemp = data.main.temp;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  drawCurrentWeather(currentTemp, description, humidity);
}
getCurrentTemp();
getForecastDays();

function drawWeatherForecast(days, forecast) {
  const daysOfWeek = days;
  day1Day.innerHTML = daysOfWeek[0];
  day2Day.innerHTML = daysOfWeek[1];
  day3Day.innerHTML = daysOfWeek[2];
  day1MinTemp.innerHTML = `Min: ${kelvinToFahrenheit(
    forecast[Object.keys(forecast)[1]].minTemperature
  )}&degF`;
  day1MaxTemp.innerHTML = `Max: ${kelvinToFahrenheit(
    forecast[Object.keys(forecast)[1]].maxTemperature
  )}&degF`;
  day2MinTemp.innerHTML = `Min: ${kelvinToFahrenheit(
    forecast[Object.keys(forecast)[2]].minTemperature
  )}&degF`;
  day2MaxTemp.innerHTML = `Max: ${kelvinToFahrenheit(
    forecast[Object.keys(forecast)[2]].maxTemperature
  )}&degF`;
  day3MinTemp.innerHTML = `Min: ${kelvinToFahrenheit(
    forecast[Object.keys(forecast)[3]].minTemperature
  )}&degF`;
  day3MaxTemp.innerHTML = `Max: ${kelvinToFahrenheit(
    forecast[Object.keys(forecast)[3]].maxTemperature
  )}&degF`;
}

function drawCurrentWeather(temp, description, humidity) {
  currentTemperature.innerHTML = `${kelvinToFahrenheit(temp)}&degF`;
  weatherDescription.innerHTML = capitalize(description);
  humidityP.innerHTML = `${humidity}% Humidity`;
}

function kelvinToCelsius(temperature) {
  return Math.round(parseFloat(temperature) - 273.15);
}

function kelvinToFahrenheit(temperature) {
  return Math.round(kelvinToCelsius(temperature) * 1.8 + 32);
}

function capitalize(text) {
  const words = text.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}
