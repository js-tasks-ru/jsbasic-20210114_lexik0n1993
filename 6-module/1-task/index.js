export default class UserTable {
  constructor(rows) {
    this.createTable(rows);
  }

  createTable(rows) {
    this.elem = document.createElement('table');

    this.createTableTitles();
    this.createTableRows(rows);
    this.addTableHandlers();
  }

  createTableTitles() {
    this.elem.innerHTML += `
      <thead>
          <tr>
              <th>Имя</th>
              <th>Возраст</th>
              <th>Зарплата</th>
              <th>Город</th>
              <th></th>
          </tr>
      </thead>
    `;
  }

  createTableRows(rows) {
    const tableBody = document.createElement('tbody');
    
    rows.forEach(row => {
      tableBody.innerHTML += `
        <tr>
          <td>${row.name}</td>
          <td>${row.age}</td>
          <td>${row.salary}</td>
          <td>${row.city}</td>
          <td><button>X</button></td>
        </tr>
      `;
    });

    this.elem.insertAdjacentElement('beforeend', tableBody);
  }

  addTableHandlers() {
    this.elem.addEventListener('click', (evt) => {
      if (evt.target.tagName === 'BUTTON') {
        const parentRow = evt.target.closest('tr');

        this.removeTableRow(parentRow);
      }
    });
  }

  removeTableRow(row) {
    row.remove();
  }
}
