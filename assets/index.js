let modal = document.getElementById("miModal");
let daysContainer = document.getElementsByClassName("calendarContainer");

const displayModal = (day) => {
  modal.style.display = "block";
  modal.getElementsByTagName("p")[0].innerHTML = day;
};

const closeModal = () => {
  modal.style.display = "none";
};

const addOnClicEvent = (object) => {
  let day = object.textContent;
  console.log(day[0]);
  let texto = day + " de Junio de 2020";
  object.onclick = (e) => displayModal(texto);
};

for (const el of daysContainer) {
  for (const div of el.children) {
    addOnClicEvent(div);
  }
}
