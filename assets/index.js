let modal = document.getElementById("miModal");
let daysContainer = document.getElementsByClassName("calendarContainer");
let fecha = document.getElementById("fecha");
let today = new Date();

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
  5: [
    [5, 1],
    [5, 2],
    [5, 3],
    [5, 4],
    [5, 5],
    [5, 6],
    [5, 0],
  ],
};

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

const gridMonth = () => {
  /*
  1. Get days of the month
  2. Get position of first day
  3. Full back position of the first day with '0,0'
  4. Get position 
  */
};

let createDays = () => {
  // let dynamic = document.getElementById("dynamicHTML");

  let container = document.getElementById("container");

  for (const weekEl in dayObjectBox) {
    let div = document.createElement("div");
    div.className = "calendarContainer";
    container.appendChild(div);

    dayObjectBox[weekEl].forEach((dayEl) => {
      let divDay = document.createElement("div");
      divDay.dataset.position = dayEl;
      div.appendChild(divDay);
    });
  }
};

const addOnClicEvent = (object, date) => {
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let month = monthName[date.getMonth()];
  let year = date.getFullYear();
  let texto = `${day} de ${month} de ${year}`;
  object.onclick = (e) => displayModal(texto);
};

const deleteOnClicEvent = (object) => {
  object.onclick = null;
};

const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};
const getDaysPosition = (date) => {
  let month = date.getMonth();
  let year = date.getFullYear();
  let daysMonth = getDaysInMonth(month + 1, year);
  let firstDay = new Date(year, month, 1).getDay() - 1;
  if (firstDay < 0) {
    firstDay = 6;
  }

  for (let index = 0; index < daysMonth; index++) {
    let dynamicDay = new Date(year, month, index + 1);
    let day = dynamicDay.getDate();
    let weekday = dynamicDay.getDay();

    let row = Math.floor(Math.abs(day + firstDay - 1) / 7);
    let column = weekday;
    let position = `${row},${column}`;

    let element = document.querySelectorAll(`[data-position='${position}']`);
    element[0].innerHTML = day;
    addOnClicEvent(element[0], dynamicDay);
  }
};

let setCalendarMonth = (date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const text = `${monthName[month]} ${year}`;
  fecha.innerHTML = text;
};

const displayModal = (day) => {
  modal.style.display = "block";
  modal.getElementsByTagName("p")[0].innerHTML = day;
};

const closeModal = () => {
  modal.style.display = "none";
};

let createDivTag = (number) => {
  let tag = document.createElement("div");
  let text = document.createTextNode(number);
  tag.appendChild(text);
  return tag;
};

const changeMonth = () => {
  setAllMonthsNull();
  let inputMonth = document.getElementById("month").selectedIndex;
  let specificDate = new Date(2020, inputMonth, 1);
  setCalendarMonth(specificDate);
  getDaysPosition(specificDate);
};

const setMonthSelect = () => {
  let selectTag = document.getElementById("month");
  for (let month = 0; month < 12; month++) {
    const optionTag = document.createElement("option");
    let textNode = document.createTextNode(monthName[month]);
    optionTag.appendChild(textNode);
    selectTag.appendChild(optionTag);
  }
};

const setAllMonthsNull = () => {
  for (let row = 0; row < 6; row++) {
    for (let column = 0; column < 7; column++) {
      let position = `${row},${column}`;
      let element = document.querySelectorAll(`[data-position='${position}']`);
      element[0].innerHTML = "";
      deleteOnClicEvent(element[0]);
    }
  }
};

createDays();
let targetMonth = today.getMonth();
let specificDate = new Date(2020, targetMonth, 1);
setCalendarMonth(specificDate);
getDaysPosition(specificDate);
setMonthSelect();
