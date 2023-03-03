const temp = document.getElementById("current-temp");
const icon = document.getElementById("weather-icon");
const caption = document.querySelector("figcaption");
const url = "https://api.openweathermap.org/data/2.5/weather?q=fairbanks&appid=582b55efa5e27910234adbbf3225cdad&units=imperial"
async function apiFetch(){
    try {
        const response =  await fetch(url);
        if (response.ok){
            const data = await response.json();
            displayResults(data);
        } else{
            throw Error(await response.text());
        }
    } catch (error){
        console.log(error)
    }
}
apiFetch();

function displayResults(d){
    temp.innerHTML = `<strong>${d.main.temp.toFixed(0)}</strong>`
    const iconsrc = `https://openweathermap.org/img/w/${d.weather[0].icon}.png`;
    const des = d.weather[0].description;
    icon.setAttribute("src", iconsrc);
    icon.setAttribute("alt", des)
    const splitCaption = des.split(" ")
    for (let i = 0; i < splitCaption.length; i++){
        splitCaption[i] = splitCaption[i][0].toUpperCase() + splitCaption[i].substr(1);
    }
    
    caption.innerText = splitCaption.join(" ")
    


}