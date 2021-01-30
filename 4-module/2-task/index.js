/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
  const tableSize = table.rows.length;

  for (let i = 0; i < tableSize; i++) {
    table.rows[i].cells[i].style.backgroundColor = 'red';
  }
}
