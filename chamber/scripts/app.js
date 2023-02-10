const datefield = document.querySelector(".date");


const now = new Date();
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now);


datefield.innerHTML = `<p>${fulldate}</p>`;

const year = now.getFullYear();

document.getElementById("webInfo").innerHTML = `&copy; ${year} | Edgar Cure | WDD 230 Project | Last Modified on: ${document.lastModified}`

function toggleMenu(){
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburguerBtn").classList.toggle("open");

}

const x = document.getElementById("hamburguerBtn");
x.onclick = toggleMenu;

if (now.getDay() === 1 || now.getDay() == 2){
  document.getElementById("banner").style.display = "flex";
} else{
  document.getElementById("banner").style.display = "none";
}

const closeButton = document.getElementById("closeBanner");
closeButton.addEventListener("click", () => {
  document.getElementById("banner").style.display = "none"
}
)

function weatherBalloon( cityID ) {
    var key = "582b55efa5e27910234adbbf3225cdad";
    fetch("https://api.openweathermap.org/data/2.5/weather?id=" + cityID+ "&appid=" + "582b55efa5e27910234adbbf3225cdad")  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      drawWeather(data);
    })
    .catch(function() {
      // catch any errors
    });
  }
  
  window.onload = function() {
 
  weatherBalloon( 5374232 );
}

function drawWeather( d ) {
  var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
	
	//document.getElementById('description').innerHTML = d.weather[0].description;
	document.getElementById('temp').innerHTML = fahrenheit + '&deg;';
	document.getElementById('location').innerHTML = d.name;
  const windSpeed = d.wind.speed;
  const mph =  parseFloat(windSpeed * 2.236936).toFixed(1);
  document.getElementById('windSpeed').innerHTML = `Wind Speed: ${mph} mph`
  if (fahrenheit <= 50 && mph > 3.0){
    const windChillVar = parseFloat(35.74 + (0.6215 * fahrenheit) - (35.75 * (mph ** 0.16)) + (0.4275 * fahrenheit * (mph ** 0.16))).toFixed(1);
    document.getElementById("windChill").innerHTML = `Wind Chill: ${windChillVar}&deg;`
  } 
  else {
    const windChillVar = "N/A";
    document.getElementById("windChill").innerHTML = `Wind Chill: ${windChillVar}`
    
  }
  
}
