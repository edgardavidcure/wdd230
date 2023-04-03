async function getFruitsData(){
    const response = await fetch("json/fruits.json");
    const data = await response.json();
    appendFruitOptions(data.fruits)
}

const appendFruitOptions = (fruits) => {
    const options = document.querySelectorAll("select");
    options.forEach(selectElement => {
        fruits.forEach(fruit => {
            const option = document.createElement("option");
            option.textContent = fruit.name
            selectElement.appendChild(option);
        });
    })
    
}

getFruitsData()