/** @format */

//DOM ATTACHMENTS
const getRecipeBtn = document.querySelector("#fetch-button");
const itemPicture = document.querySelector("#item-picture");
const itemIngredients = document.querySelector("#item-ingredients");
const itemText = document.querySelector("#item-text");
const itemTitle = document.querySelector("#item-title");

const API_KEY = "2d529a9fd86d9f6d2ed5a8dd40b7981e 	";
const API_ID = "8e6e6d9e";
const API_LINK = `https://api.edamam.com/search?q=chicken&app_id=${API_ID}&app_key=${API_KEY}`;

let foodInformation = {};

function getData() {
  fetch(API_LINK)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      foodInformation.title = data.hits[0].recipe.label;
      foodInformation.calories = Math.floor(data.hits[0].recipe.calories);
      foodInformation.protein = Math.floor(data.hits[0].recipe.digest[2].total);
      foodInformation.carbs = Math.floor(data.hits[0].recipe.digest[1].total);
      foodInformation.fat = Math.floor(data.hits[0].recipe.digest[0].total);
      foodInformation.image = data.hits[0].recipe.image;
      foodInformation.ingredients = data.hits[0].recipe.ingredientLines;
      foodInformation.time = data.hits[0].recipe.totalTime;
    });
}

async function seeInfo() {
  await getData();
  await console.log(foodInformation);
  setTimeout(() => {
    itemTitle.innerText = foodInformation.title;
    let unorderedList = document.createElement("ul");
    for (let i = 0; i < foodInformation.ingredients.length; i++) {
      let listItem = document.createElement("li");
      listItem.innerText = foodInformation.ingredients[i];
      unorderedList.appendChild(listItem);
    }
    itemText.appendChild(unorderedList);
    itemPicture.style.backgroundImage = `url('${foodInformation.image}')`;
    console.log(itemPicture.style.backgroundImage);
  }, 1000);
}

getRecipeBtn.addEventListener("click", seeInfo);
