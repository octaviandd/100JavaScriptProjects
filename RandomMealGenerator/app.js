/** @format */

//DOM ATTACHMENTS
const getRecipeBtn = document.querySelector("#fetch-button");
const itemPicture = document.querySelector("#item-picture");
const itemIngredients = document.querySelector("#item-ingredients");
const itemText = document.querySelector("#item-text");
const itemTitle = document.querySelector("#item-title");

const API_KEY = "2d529a9fd86d9f6d2ed5a8dd40b7981e 	";
const API_ID = "8e6e6d9e";

const RandomNumber = Math.floor(Math.random() * 9);
const randomFood = [
  "chicken",
  "cheese",
  "pork",
  "pizza",
  "bread",
  "sauce",
  "sugar",
  "pastry",
  "beef"
];

let RandomFood = randomFood[Math.floor(Math.random() * 9)];

const API_LINK = `https://api.edamam.com/search?q=${RandomFood}&app_id=${API_ID}&app_key=${API_KEY}`;

let foodInformation = {};

function getData() {
  fetch(API_LINK)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      foodInformation.title = data.hits[RandomNumber].recipe.label;
      foodInformation.calories = Math.floor(
        data.hits[RandomNumber].recipe.calories
      );
      foodInformation.protein = Math.floor(
        data.hits[RandomNumber].recipe.digest[2].total
      );
      foodInformation.carbs = Math.floor(
        data.hits[RandomNumber].recipe.digest[1].total
      );
      foodInformation.fat = Math.floor(
        data.hits[RandomNumber].recipe.digest[0].total
      );
      foodInformation.image = data.hits[RandomNumber].recipe.image;
      foodInformation.ingredients =
        data.hits[RandomNumber].recipe.ingredientLines;
      foodInformation.time = data.hits[RandomNumber].recipe.totalTime;
    });
}

async function seeInfo() {
  await getData();
  console.log(foodInformation);
  setTimeout(() => {
    itemTitle.innerText = foodInformation.title;
    let unorderedList = document.createElement("ul");
    for (let i = 0; i < foodInformation.ingredients.length; i++) {
      let listItem = document.createElement("li");
      listItem.innerText = foodInformation.ingredients[i];
      unorderedList.appendChild(listItem);
    }
    itemText.appendChild(unorderedList);
    let imageElement = document.createElement("img");
    imageElement.src = `${foodInformation.image}`;
    itemPicture.appendChild(imageElement);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 500);
  }, 1000);
}

getRecipeBtn.addEventListener("click", seeInfo);
