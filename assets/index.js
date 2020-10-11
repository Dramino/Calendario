let modal = document.getElementById("miModal");
let daysContainer = document.getElementsByClassName("calendarContainer");
let monthDate = document.getElementById("monthDate");
let formulario = document.getElementById("calendarForm");
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

let selectedPosition;
let selectedMonth;

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
      divDay.className = "dayClass";
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
  let position = object.dataset.position;
  object.onclick = (e) => displayModal(texto, position);
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

    let row = Math.floor((day + firstDay - 1) / 7);
    let column = weekday;
    let position = `${row},${column}`;

    let element = document.querySelectorAll(`[data-position='${position}']`);
    element[0].className = "dayClass";
    let divTag = document.createElement("div");
    let divTagTitle = document.createElement("div");
    divTagTitle.className = "descripcion";
    divTag.innerHTML = day;
    // divTagTitle.innerHTML = "Title";
    // element[0].appendChild(divTagTitle);
    element[0].appendChild(divTag);
    addOnClicEvent(element[0], dynamicDay);
  }
};

let setCalendarMonth = (date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const text = `${monthName[month]} ${year}`;
  selectedMonth = month;
  monthDate.innerHTML = text;
};

const displayModal = (day, position) => {
  modal.style.display = "block";
  modal.getElementsByTagName("p")[0].innerHTML = day;
  selectedPosition = position;
};

const closeModal = () => {
  modal.style.display = "none";
};

const changeMonth = () => {
  setAllMonthsNull();
  let inputMonth = document.getElementById("month").selectedIndex;
  let specificDate = new Date(2020, inputMonth, 1);
  setCalendarMonth(specificDate);
  getDaysPosition(specificDate);
  getDaysLastMonthPosition(specificDate);
};

const setMonthSelectTag = () => {
  let selectTag = document.getElementById("month");
  for (let month = 0; month < 12; month++) {
    let optionTag = document.createElement("option");
    let textNode = document.createTextNode(monthName[month]);
    optionTag.appendChild(textNode);
    selectTag.appendChild(optionTag);
  }
  let today = new Date();
  selectTag.value = monthName[today.getMonth()];
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

const getDaysLastMonthPosition = (currentDate) => {
  let currentMonth = currentDate.getMonth();
  let lastMonth = currentMonth - 1;
  if (lastMonth < 0) {
    lastMonth = 11;
  }
  let currentYear = currentDate.getFullYear();
  let yearLastMonth = currentYear;
  if (lastMonth === 11) {
    yearLastMonth--;
  }
  let daysLastMonth = getDaysInMonth(lastMonth + 1, yearLastMonth);
  let firstDayCurrentMonth =
    new Date(currentYear, currentMonth, 1).getDay() - 1;
  if (firstDayCurrentMonth < 0) {
    firstDayCurrentMonth = 6;
  }

  let column = 0;
  for (
    let day = daysLastMonth - firstDayCurrentMonth + 1;
    day < daysLastMonth + 1;
    day++
  ) {
    column++;
    let position = `0,${column}`;

    let element = document.querySelectorAll(`[data-position='${position}']`);
    element[0].innerHTML = day;
    element[0].className = "lastMonth";
  }
};

const addDescription = (div) => {
  const divTag = document.createElement("div");
  divTag.className = "descripcion";
  divTag.innerHTML = "Evento";
  console.log(div[0]);

  div[0].insertBefore(divTag, div[0].childNodes[0]);
};

const submit = (e) => {
  e.preventDefault();
  const title = formulario.elements["title"].value;
  const description = formulario.elements["description"].value;
  const people = formulario.elements["people"].value;
  let jsonData = JSON.stringify({
    title: title,
    description: description,
    people: people,
    position: selectedPosition,
    month: selectedMonth,
  });
  localStorage.setItem("data", jsonData);
  const jsonTitle = JSON.stringify({ title: title });
  const textTitle = JSON.parse(jsonTitle);
  let element = document.querySelectorAll(
    `[data-position='${selectedPosition}']`
  );
  addDescription(element);
  closeModal();
};

/*
pseudocódigo

1. obtener el dayposition
2. obtener el mes
3. crear un texto daypostion/mes
4. guardarlo con localStorage
5. transformarlo en json
6. guardar en localStorage un json en formato de texto con los datos del formulario
7. necesito un json y por lo tanto que se lea el json como texto
*/

/*
pseudocódigo para crear un flujo de información

1. llamar al elemento del localStorage 
2. crea un elemento div
3. colocar la información del localStorage en el elemento div

*/

createDays();
let targetMonth = today.getMonth();
let specificDate = new Date(2020, targetMonth, 1);
setCalendarMonth(specificDate);
getDaysPosition(specificDate);
setMonthSelectTag();
getDaysLastMonthPosition(today);

formulario.addEventListener("submit", submit);
