function weatherBalloon(cityID) {
  var key = "582b55efa5e27910234adbbf3225cdad";
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?id=" +
      cityID +
      "&appid=" +
      "582b55efa5e27910234adbbf3225cdad"
  )
    .then(function (resp) {
      return resp.json();
    }) // Convert data to json
    .then(function (data) {
      drawWeather(data);
    })
    .catch(function () {
      // catch any errors
    });
}

window.onload = function () {
  weatherBalloon(5374232);
};

function drawWeather(d) {
  var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
  var fahrenheit = Math.round((parseFloat(d.main.temp) - 273.15) * 1.8 + 32);
  const description = d.weather[0].description.split(" ");
  for (let i = 0; i < description.length; i++) {
    description[i] = description[i][0].toUpperCase() + description[i].substr(1);
  }
  const image = document.getElementById("weatherImg");

  const capitalizedDescription = description.join(" ");
  document.getElementById("description").innerText = capitalizedDescription;
  switch (capitalizedDescription) {
    case "Clear Sky":
      iconsrc = "images/clearsky-icon.png";
      break;
    case "Few Clouds":
      iconsrc = "images/fewclouds-icon.png";
      break;
    case "Scattered Clouds":
      iconsrc = "images/scatteredclouds-icon.png";
      break;
    case "Broken Clouds":
      iconsrc = "images/brokenclouds-icon.png";
      break;
    case "Shower Rain":
      iconsrc = "images/showerrain-icon.png";
      break;
    case "Rain":
      iconsrc = "images/rain-icon.png";
      break;
    case "Thunderstorm":
      iconsrc = "images/thunderstorm-icon.png";
      break;
    case "Snow":
      iconsrc = "images/snow-icon.png";
      break;
    case "Mist":
      iconsrc = "images/mist-icon.png";
      break;
    default:
      iconsrc = `https://openweathermap.org/img/w/${d.weather[0].icon}.png`;
  }

  image.setAttribute("src", iconsrc);
  image.setAttribute("alt", capitalizedDescription);
  //document.getElementById('description').innerHTML = d.weather[0].description;
  document.getElementById("temp").innerHTML = fahrenheit + "&deg; F";
  document.getElementById("location").innerHTML = d.name;
  const windSpeed = d.wind.speed;
  const mph = parseFloat(windSpeed * 2.236936).toFixed(1);
  document.getElementById("windSpeed").innerHTML = `Wind Speed: ${mph} mph`;
  if (fahrenheit <= 50 && mph > 3.0) {
    const windChillVar = parseFloat(
      35.74 +
        0.6215 * fahrenheit -
        35.75 * mph ** 0.16 +
        0.4275 * fahrenheit * mph ** 0.16
    ).toFixed(1);
    document.getElementById(
      "windChill"
    ).innerHTML = `Wind Chill: ${windChillVar}&deg;`;
  } else {
    const windChillVar = "N/A";
    document.getElementById(
      "windChill"
    ).innerHTML = `Wind Chill: ${windChillVar}`;
  }
}
