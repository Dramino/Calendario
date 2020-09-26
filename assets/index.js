let modal = document.getElementById("miModal");
let daysContainer = document.getElementsByClassName("calendarContainer");

const addOnClicEvent = (object) => {
  let day = object.textContent;
  object.onclick = (e) => displayModal(day);
};

const displayModal = (day) => {
  modal.style.display = "block";
  modal.getElementsByTagName("p")[0].innerHTML = day;
};

const closeModal = () => {
  modal.style.display = "none";
};

for (const el of daysContainer) {
  for (const div of el.children) {
    addOnClicEvent(div);
  }
}
