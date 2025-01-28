import { LitElement, html, css } from 'lit';
import { dataTable, observeTableChanges, saveInvoice } from "../controllers/summaryController.js"; // Asegúrate de tener estas funciones definidas en tu controlador

class SummaryComponent extends LitElement {
  constructor() {
    super();
    this.subtotal = 0.00;
    this.iva = 0.00;
    this.total = 0.00;
  }

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    .card-header {
      text-align: center;
    }

    .card-body {
      padding: 20px;
    }

    .text-center {
      text-align: center;
    }

    .btn {
      padding: 10px 20px;
    }
  `;

  render() {
    return html`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
      <div class="container mt-5">
        <div class="card">
          <div class="card-header">
            <h3>Invoice Detail</h3>
          </div>
          <div class="card-body">
            <div class="mt-3">
              <p><strong>Subtotal:</strong> <span id="subtotal">${this.subtotal.toFixed(2)}</span></p>
              <p><strong>IVA (19%):</strong> <span id="iva">${this.iva.toFixed(2)}</span></p>
              <p><strong>Total:</strong> <span id="total">${this.total.toFixed(2)}</span></p>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-primary btn-lg" id="payBtn" @click="${this.handlePayClick}">Pay</button>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    const userComponent = document.querySelector("user-component");
    if (userComponent) {
      userComponent.addEventListener("userDataSubmitted", (event) => {
        const userData = event.detail;
        localStorage.setItem("dataParcial", JSON.stringify(userData));
      });
    }

    const tableComponent = document.querySelector("table-component");
    if (tableComponent) {
      const tableBody = tableComponent.shadowRoot.querySelector("tbody");
      observeTableChanges(tableBody, () => {
        dataTable(tableBody, this);
      });
    }
  }

  handlePayClick() {
    const tableComponent = document.querySelector("table-component");
    if (tableComponent) {
      const tableBody = tableComponent.shadowRoot.querySelector("tbody");
      if (tableBody) {
        dataTable(tableBody, this); // Actualizar los datos con la información de la tabla
      }
      saveInvoice(this); // Guardar la factura
    }
  }

  // Este método actualizará el subtotal, IVA y total en función de los datos de la tabla
  updateInvoiceSummary(subtotal, iva, total) {
    this.subtotal = subtotal;
    this.iva = iva;
    this.total = total;
    this.requestUpdate(); 
    
  }
}

customElements.define("summary-component", SummaryComponent);
