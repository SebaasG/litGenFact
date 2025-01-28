import { LitElement, html, css } from 'lit';
import { setTable } from "../controllers/tableController.js"; // Importa la función del controlador

class TableComponent extends LitElement {
  constructor() {
    super();
    this.tableData = []; // Datos de la tabla
  }

  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
      <table class="table">
        <thead>
          <div class="d-flex justify-content-center no-wrap">
            <tr>
              <th colspan="4" class="text-center fs-5">Purchase Detail</th>
            </tr>
          </div>
          <tr>
            <th scope="col" id="codTable">#</th>
            <th scope="col" id="nameTable">Name</th>
            <th scope="col" id="valueTable">Value/unit</th>
            <th scope="col" id="amountTable">Amount</th>
            <th scope="col" id="subTable">Subtotal</th>
            <th scope="col" id="btnTable"></th>
          </tr>
        </thead>
        <tbody>
          ${this.tableData.map(item => html`
            <tr>
              <td>${item.code}</td>
              <td>${item.name}</td>
              <td>${item.value}</td>
              <td>${item.amount}</td>
              <td>${item.subTotal.toFixed(2)}</td>
              <td><button class="btn btn-danger btnDelete" @click="${() => this._deleteRow(item)}">X</button></td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const userComponent = document.querySelector("user-component");

    userComponent.addEventListener("userDataSubmitted", (event) => {
      const userData = event.detail;
      const tableData = this.prepareTableData(userData);
      this._setTable(tableData); // Llenar la tabla con los datos del usuario
    });
  }

  prepareTableData(userData) {
    return userData.items.map(item => ({
      code: item.code,
      name: item.name,
      value: item.value,
      amount: item.amount,
      subTotal: item.value * item.amount, // Calcula el subtotal
    }));
  }

  _setTable(tableData) {
    tableData.forEach(item => {
      const existingItem = this.tableData.find(row => row.code === item.code);
      if (existingItem) {
        existingItem.amount += item.amount;
        existingItem.subTotal = existingItem.value * existingItem.amount; // Recalcular el subtotal
      } else {
        this.tableData = [...this.tableData, item]; // Agregar nuevo producto
      }
    });
    this.requestUpdate();
  }

  _deleteRow(item) {
    this.tableData = this.tableData.filter(row => row !== item); // Eliminar fila
  }
}

customElements.define("table-component", TableComponent);
