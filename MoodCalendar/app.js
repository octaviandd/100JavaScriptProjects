/** @format */

//Get DOM elements
const moodButtons = document.querySelectorAll(".mood-emo");
const calendar = document.querySelector("#calendar");
const randomBtn = document.querySelector("#random_btn");
const resetBtn = document.querySelector("#reset_btn");

// color that is will be selected when clicking a button(getting a specific color)
let activeColor = "";

// use of variable (not really necessary)
let year = new Date();
const currentYear = year.getFullYear();

const weekDays = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "Aprill",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// add color to buttons and get their color
moodButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.classList.contains("selected")) {
      button.classList.remove("selected");
    } else {
      moodButtons.forEach(button => {
        button.classList.remove("selected");
      });
      button.classList.add("selected");
      activeColor = getComputedStyle(button).getPropertyValue("color");
      console.log(activeColor);
    }
  });
});

const getDays = year => {
  //get first day of year and last day of year
  const firstDay = new Date(`January 1 ${year}`);
  const lastDay = new Date(`December 31 ${year}`);

  //create list
  const days = [firstDay];

  let lastDayInList = firstDay;

  //get time gets seconds since 1978 or smth, bascially with each day added
  // into array, the last day in list is closer to today
  // so first day is at index 0 at start and lastDayinList the same
  //after first interation of loop, firstday stays at index 0 while the last day in list goes to 0
  //or days[days.length - 1]
  while (lastDay.getTime() !== lastDayInList.getTime()) {
    days.push(addDays(lastDayInList, 1));
    lastDayInList = days[days.length - 1];
  }

  return days;
};

const addDays = (date, days) => {
  //result is a copy of date, which is lastday in the array
  let result = new Date(date);
  //setDates makes sure when the months reaches end, you start from 1 with next month
  // days is just a 1 increment
  result.setDate(result.getDate() + days);
  return result;
};

let dates = getDays(currentYear);

let monthsHTML = "";

months.forEach((month, idx) => {
  monthsHTML += `
        <div class="months month_${idx}">
            <h2>${month}</h2>
            <div class="weekdays_container">
            ${weekDays
              .map(day => `<div class="day_container">${day}</div>`)
              .join("")}
            </div>
            <div class="days_container"></div>
        </div>
    `;
});

calendar.innerHTML = monthsHTML;

dates.forEach(date => {
  const month = date.getMonth();
  let monthEl = document.querySelector(`.month_${month} .days_container`);

  if (date.getDate() === 1 && date.getDay() !== 0) {
    for (let i = 0; i < date.getDay(); i++) {
      let emptySpace = createEmptySpace();
      monthEl.appendChild(emptySpace);
    }
  }

  let dateEl = createDayElement(date);
  monthEl.appendChild(dateEl);
});

function createEmptySpace() {
  let space = document.createElement("div");
  space.classList.add("day");
  return space;
}

function createDayElement(date) {
  let element = document.createElement("div");
  element.classList.add("day");
  element.innerHTML = `<span class="circle">${date.getDate()}</span>`;
  return element;
}

const circle = document.querySelectorAll(".circle");
circle.forEach(circle => {
  circle.addEventListener("click", () => {
    circle.style.background = activeColor;
  });
});

randomBtn.addEventListener("click", () => {
  circle.forEach(circle => {
    let color = ["#2d6b5f", "#72e3a6", "#dff4c7", "#edbf98", "#ea3d36"];
    circle.style.background = color[Math.floor(Math.random() * 5)];
  });
});

resetBtn.addEventListener("click", () => {
  circle.forEach(circle => {
    circle.style.background = "#888";
  });
});
