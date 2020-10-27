let modal = document.getElementById("miModal");
let daysContainer = document.getElementsByClassName("calendarContainer");
let monthDate = document.getElementById("monthDate");
let formulario = document.getElementById("calendarForm");
let today = new Date();
let selectedPosition;
let selectedMonth;

let createDays = () => {
  // let dynamic = document.getElementById("dynamicHTML");

  let container = document.getElementById("container");

  for (const weekEl in DAY_OBJECT_BOX) {
    let div = document.createElement("div");
    div.className = "calendarContainer";
    container.appendChild(div);

    DAY_OBJECT_BOX[weekEl].forEach((dayEl) => {
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
  let month = MONTH_NAME[date.getMonth()];
  let year = date.getFullYear();
  let texto = `${day} de ${month} de ${year}`;
  let position = object.dataset.position;
  object.onclick = (e) => {
    displayModal(texto, position)
  };
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
  const text = `${MONTH_NAME[month]} ${year}`;
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
  let inputMonth = document.getElementById("month").selectedIndex;
  let specificDate = new Date(2020, inputMonth, 1);

  setAllMonthsNull();
  setCalendarMonth(specificDate);
  getDaysPosition(specificDate);
  getDaysLastMonthPosition(specificDate);
};

const setMonthSelectTag = () => {
  let selectTag = document.getElementById("month");
  let today = new Date();

  for (let month = 0; month < 12; month++) {
    let optionTag = document.createElement("option");
    let textNode = document.createTextNode(MONTH_NAME[month]);
    optionTag.appendChild(textNode);
    selectTag.appendChild(optionTag);
  }
  
  selectTag.value = MONTH_NAME[today.getMonth()];
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
  let currentYear = currentDate.getFullYear();
  let lastMonth = currentMonth - 1;
  let yearLastMonth = currentYear;

  if (lastMonth < 0) {
    lastMonth = 11;
  }
    
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
  divTag.onclick=(e)=>{
    e.stopPropagation();
  }
  div[0].insertBefore(divTag, div[0].childNodes[0]);
};

const submit = (e) => {
  e.preventDefault();
  const title = formulario.elements["title"].value;
  const description = formulario.elements["description"].value;
  const people = formulario.elements["people"].value;
  let arrayData = localStorage.getItem(selectedPosition);  
  let jsonData ={
    title: title,
    description: description,
    people: people,
    position: selectedPosition,
    month: selectedMonth,
  };
  let jsonText = "";
  if (!arrayData){
    jsonText = JSON.stringify([jsonData]);
  } else {

    let textData = JSON.parse(arrayData);
    textData.push(jsonData);
    jsonText = JSON.stringify(textData);
  }
    
  
  
  localStorage.setItem(selectedPosition, jsonText);
  console.log(localStorage.getItem(selectedPosition));
  let element = document.querySelectorAll(
    `[data-position='${selectedPosition}']`
  );
  addDescription(element);
  closeModal();
};



createDays();
let targetMonth = today.getMonth();
let specificDate = new Date(2020, targetMonth, 1);
setCalendarMonth(specificDate);
getDaysPosition(specificDate);
setMonthSelectTag();
getDaysLastMonthPosition(today);

formulario.addEventListener("submit", submit);

/*
TODO

1. Mostrar los elementos guardados del localstorage en un modal nuevo
  a) no importa que todos los elemnentos se muestren juntos.

2. Mostrar los eventos guardados de acuerdo al elemento que le das clic.

3. Guaurdarlos de acuerdo al mes.

4. Obtenerlos de acuerdo al mes.

5. Optimizar y limpiar el código.
*/