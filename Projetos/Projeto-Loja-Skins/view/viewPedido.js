export function updateSelectWidth(select, sizeMeasure) {
    const selectedOption = select.options[select.selectedIndex].text;
    sizeMeasure.textContent = selectedOption;

    select.style.width = `${sizeMeasure.offsetWidth + 46}px`;
}