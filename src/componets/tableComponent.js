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
            <th colspan="4" class="text-center fs-5">Purchase detail</th>
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
        <!-- Aquí se llenarán los datos de la tabla dinámicamente -->
      </tbody>
    </table>`;
  }

  connectedCallback() {
    super.connectedCallback();
    const userComponent = document.querySelector("user-component");

    userComponent.addEventListener("userDataSubmitted", (event) => {
      const userData = event.detail;
      setTable(this, userData)
    });
  }

  prepareTableData(userData) {
    const tableData = [];
    // Recorremos los elementos de los datos del usuario y calculamos el subtotal
    for (const item of userData.items) {
      tableData.push({
        code: item.code,
        name: item.name,
        value: item.value,
        amount: item.amount,
        subTotal: item.value * item.amount, // Calculamos el subtotal
      });
    }
    return tableData;
  }

}

customElements.define("table-component", TableComponent);
