let modal = document.getElementById("miModal");
let daysContainer = document.getElementsByClassName("calendarContainer");
let fecha = document.getElementById("fecha");
let today = new Date();
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
const monthsDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let setCalendarMonth = (date) => {
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

  const dayName = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];
  return weekFirstDay;
};

firstDayOfMonth(today);
setCalendarMonth(today);

let createDivTag = (number) => {
  let tag = document.createElement("div");
  let text = document.createTextNode(number);
  tag.appendChild(text);
  console.log(tag);
  return tag;
};

createDivTag(18);

const displayModal = (day) => {
  modal.style.display = "block";
  modal.getElementsByTagName("p")[0].innerHTML = day;
};

const closeModal = () => {
  modal.style.display = "none";
};

const addOnClicEvent = (object) => {
  let day = object.textContent;
  let texto = day + " de " + month + " de " + year;
  object.onclick = (e) => displayModal(texto);
};

for (const el of daysContainer) {
  for (const div of el.children) {
    addOnClicEvent(div);
  }
}
