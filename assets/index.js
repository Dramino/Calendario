let modal = document.getElementById("miModal");
let daysContainer = document.getElementsByClassName("calendarContainer");
let fecha = document.getElementById("fecha");
let today = new Date();

let arrayDates = [
  [1, 1],
  [1, 2],
];

let dayObjectBox = {
  0: [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 0],
  ],
  1: [
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 0],
  ],
  2: [
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 6],
    [2, 0],
  ],
  3: [
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 0],
  ],
  4: [
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
    [4, 5],
    [4, 6],
    [4, 0],
  ],
};

const gridMonth = () => {
  /*
  1. Get days of the month
  2. Get position of first day
  3. Full back position of the first day with '0,0'
  4. Get position 
  */
};

let createDays = () => {
  let dynamic = document.getElementById("dynamicHTML");

  for (const weekEl in dayObjectBox) {
    let div = document.createElement("div");
    div.className = "calendarContainer";
    dynamic.appendChild(div);

    dayObjectBox[weekEl].forEach((dayEl) => {
      let divDay = document.createElement("div");
      divDay.dataset.position = dayEl;
      div.appendChild(divDay);
    });
  }
};

const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};
const getDaysPosition = (date) => {
  /*
  1. get number of days per month : checked
  2. get position of the day in calendar : checked
  3. assing as a string with array structure i.e. "2,3" : checked
  4. get element by data attribute with  variable assigned in step 3
  5. add the number of the day as a childnode

  */
  let month = date.getMonth();
  let year = date.getFullYear();
  let daysMonth = getDaysInMonth(month + 1, year);
  const firstDay = new Date(year, month, 1).getDay();
  console.log(firstDay);
  console.log(`lo que ixpy pidió ${7 - firstDay - 1}`);

  for (let index = 0; index < daysMonth; index++) {
    let dynamicDay = new Date(year, month, index + 1);
    let day = dynamicDay.getDate();
    let weekday = dynamicDay.getDay();

    let row = Math.floor((day + firstDay) / 7);
    let column = weekday;
    let position = `${row},${column}`;

    let element = document.querySelectorAll(`[data-position='${position}']`);
    console.log(position);
    element[0].innerHTML = day;
  }
};

createDays();
getDaysPosition(today);

const monthName = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
let month = monthName[today.getMonth()];
let year = today.getFullYear();

let setCalendarMonth = (date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const text = monthName[month] + " " + year;
  fecha.innerHTML = text;
};

let isleap = (year) => {
  return year % 4 === 0;
};

let firstDayOfMonth = (date) => {
  let weekday = date.getDay();
  let day = date.getDate();
  let leftDaysForFirst = day - 1;
  let leftDaysAtSingleWeek = leftDaysForFirst % 7;
  let daysFromTarget = weekday - leftDaysAtSingleWeek;
  let weekFirstDay = daysFromTarget;
  if (daysFromTarget < 0) {
    weekFirstDay = daysFromTarget + 7;
  }
  return weekFirstDay;
};

const monthsDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
if (isleap(year)) {
  monthsDays[1] = 29;
}

const displayModal = (day) => {
  modal.style.display = "block";
  modal.getElementsByTagName("p")[0].innerHTML = day;
};

const closeModal = () => {
  modal.style.display = "none";
};

const addOnClicEvent = (object, day) => {
  let texto = day + " de " + month + " de " + year;
  object.onclick = (e) => displayModal(texto);
};

let createDivTag = (number) => {
  let tag = document.createElement("div");
  let text = document.createTextNode(number);
  tag.appendChild(text);
  return tag;
};

let addNumberDay = (element, day) => {
  let tag = createDivTag(day);
  element.appendChild(tag);
};

setCalendarMonth(today);
let firstDay = firstDayOfMonth(today);
let day = 0;
let dayCounter = 0;
let maxDay = monthsDays[today.getMonth()];

for (const el of daysContainer) {
  for (const div of el.children) {
    day++;
    dayCounter++;
    dayText = dayCounter;
    if (day < firstDay) {
      dayText = "";
      dayCounter--;
    }
    if (dayText > maxDay) {
      dayText = "";
    }
    addNumberDay(div, dayText);
    addOnClicEvent(div, dayText);
  }
}
