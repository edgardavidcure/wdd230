const orderName = document.getElementById("order-name");
const orderEmail = document.getElementById("order-email");
const orderPhone = document.getElementById("order-phone");
const orderFruits = document.getElementById("order-fruits");
const orderInstructions = document.getElementById("order-instructions");
const orderDate = document.getElementById("order-date");
const carbs = document.getElementById("carbohydrates");
const protein = document.getElementById("protein");
const fat = document.getElementById("fat")
const sugar = document.getElementById("sugar");
const calories = document.getElementById("calories");
const closeButton = document.querySelector(".close");

const inputName = document.getElementById("fname");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");
const inputFruit1 = document.getElementById("fruit1");
const inputFruit2 = document.getElementById("fruit2");
const inputFruit3 = document.getElementById("fruit3");
const instructions = document.getElementById("instructions");
const dateField = document.getElementById("date");
const date = new Date()
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    date
  );

let selectedFruits = [];
let caloriesTotal = 0;
let carbsTotal = 0;
let proteinTotal = 0;
let fatTotal = 0;
let sugarTotal = 0; 
let fruit1Value;
let fruit2Value;
let fruit3value;


closeButton.addEventListener("click", function(){
    caloriesTotal = 0
    carbsTotal = 0
    proteinTotal = 0
    fatTotal = 0
    sugarTotal = 0
})
window.addEventListener("click", function(){
    caloriesTotal = 0
    carbsTotal = 0
    proteinTotal = 0
    fatTotal = 0
    sugarTotal = 0
})
function nutritionLabel(fruitsData){
    form.addEventListener("submit", function() {
        const nameValue = inputName.value;
        orderName.innerText = nameValue;
        const emailValue = inputEmail.value;
        orderEmail.innerText = emailValue;
        const phoneValue = inputPhone.value;
        orderPhone.innerText = phoneValue;
        fruit1Value = inputFruit1.value;
        fruit2Value = inputFruit2.value;
        fruit3value = inputFruit3.value;
        orderFruits.innerText = `${fruit1Value}, ${fruit2Value}, ${fruit3value}`;
        const instructionsValue = instructions.value;
        if (!instructionsValue){
            orderInstructions.innerText = "None"
        } else {
            orderInstructions.innerText = instructionsValue
        }
        orderDate.innerText = fulldate
        selectedFruits = fruitsData.filter(
            (fruit) => fruit.name === fruit1Value || fruit.name === fruit2Value || fruit.name === fruit3value
        );
        selectedFruits.forEach(fruit => {
            caloriesTotal += fruit.nutritions.calories
            carbsTotal += fruit.nutritions.carbohydrates
            fatTotal += fruit.nutritions.fat
            proteinTotal += fruit.nutritions.protein
            sugarTotal += fruit.nutritions.sugar
        })
        carbs.innerText = `${Math.round(carbsTotal)}g`
        protein.innerText = `${Math.round(proteinTotal)}g`
        fat.innerText = `${Math.round(fatTotal)}g`
        sugar.innerText = `${Math.round(sugarTotal)}g`
        calories.innerText = `${Math.round(caloriesTotal)}g`
        console.log(carbsTotal)
        console.log(selectedFruits)

    })
    
}



async function getFruitsData(){
    const response = await fetch("json/fruits.json");
    const data = await response.json();
    appendFruitOptions(data.fruits)
    nutritionLabel(data.fruits)
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


