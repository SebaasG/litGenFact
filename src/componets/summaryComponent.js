import { LitElement, html, css } from 'lit';
import { dataTable, observeTableChanges, saveInvoice } from "../controllers/summaryController.js";

class SummaryComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    .container {
      margin-top: 2rem;
    }

    .card-header {
      text-align: center;
    }

    .card-body {
      padding: 20px;
    }

    .btn {
      padding: 10px 20px;
    }

    .text-center {
      text-align: center;
    }
  `;

  constructor() {
    super();
    this.subtotal = 0.00;
    this.iva = 0.00;
    this.total = 0.00;
  }

  // Aseguramos que las propiedades sean reactivas para que el DOM se actualice cuando cambien.
  static properties = {
    subtotal: { type: Number },
    iva: { type: Number },
    total: { type: Number },
  };

  render() {
    return html`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
      <div class="container mt-5">
        <div class="card">
          <div class="card-header text-center">
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
          <button class="btn btn-primary btn-lg" @click="${this.handlePayButtonClick}">Pay</button>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    // Inicializar observadores para la tabla
    const tableComponent = document.querySelector("table-component");
    if (tableComponent) {
      const tableBody = tableComponent.shadowRoot.querySelector("tbody");
      observeTableChanges(tableBody, () => {
        // Cuando hay cambios en la tabla, se recalculan los valores y se actualiza el resumen
        dataTable(tableBody, this);
      });
    }

    const userComponent = document.querySelector("user-component");
    if (userComponent) {
      userComponent.addEventListener("userDataSubmitted", (event) => {
        const userData = event.detail;
        localStorage.setItem("dataParcial", JSON.stringify(userData));
      });
    }
  }

  handlePayButtonClick() {
    const tableComponent = document.querySelector("table-component");
    if (tableComponent) {
      const tableBody = tableComponent.shadowRoot.querySelector("tbody");
      if (tableBody) {
        dataTable(tableBody, this);  // Actualiza el resumen al hacer clic en "Pay"
      }
      saveInvoice(this);  // Guarda la factura
    }
  }

  // Método para actualizar el resumen de la factura
  updateInvoiceSummary(subtotal, iva, total) {
    this.subtotal = subtotal;
    this.iva = iva;
    this.total = total;
    this.requestUpdate(); // Reflejar cambios en el DOM
  }
}

customElements.define('summary-component', SummaryComponent);
