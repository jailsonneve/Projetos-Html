import { updateSelectWidth } from "../view/viewAgendamento.js";
const select = document.getElementById("dynamic-select");
const sizeMeasure = document.getElementById("size-measure");
select.addEventListener("change", updateSelectW);
function updateSelectW() {
  updateSelectWidth(select, sizeMeasure);
}
updateSelectW();