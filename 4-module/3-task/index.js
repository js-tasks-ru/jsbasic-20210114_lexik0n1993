/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  const rows = Array.from(table.tBodies[0].rows);

  rows.forEach(row => {
    if (+row.cells[1].innerText < 18) {
      row.style.textDecoration = 'line-through';
    }

    if (row.cells[2].innerText === 'm') {
      row.classList.add('male');
    } else {
      row.classList.add('female');
    }

    const status = row.cells[3].dataset.available;
    switch (status) {
      case 'true':
        row.classList.add('available');
        break;
      case 'false':
        row.classList.add('unavailable');
        break;
      default:
        row.setAttribute('hidden', true);
        break;
    }
  });
}
