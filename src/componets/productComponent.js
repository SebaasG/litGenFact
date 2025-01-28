import { LitElement, html, css } from 'lit';
import { loadProducts, loadCode } from "../controllers/productController.js"; // Importar las funciones del controlador
import { collectUserData } from "../controllers/userController.js"; // Importar la función collectUserData

class ProductComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  constructor() {
    super();
    this.products = []; 
    this.selectedProduct = null; 
  }

  // Método que renderiza la plantilla HTML
  render() {
    return html`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
      <form>
        <label for="selectProd" class="form-label">Select Product</label>
        <select class="form-select" id="selectProd" @change="${this._onProductChange}">
          <option value="">Choose product...</option>
          ${this.products.map(product => html`
            <option value="${product.id}">${product.name}</option>
          `)}
        </select>

        <div class="mb-3">
          <label for="codeNumber" class="form-label">Code</label>
          <input type="text" class="form-control" id="codeNumber" .value="${this.selectedProduct ? this.selectedProduct.id : ''}" disabled>
        </div>

        <div class="d-flex gap-3">
          <div class="flex-grow-1">
            <label for="unitValue" class="form-label">Unit Value</label>
            <input type="text" class="form-control" disabled id = "unitValue">
          </div>
          <div class="flex-grow-1">
            <label for="amountProd" class="form-label">Amount</label>
            <input type="number" class="form-control" id="amountProd">
          </div>
        </div>

        <div class="d-flex justify-content-center"> 
          <button type="submit" id="submitBtn" class="btn btn-primary mx-auto mt-3" @click="${this._onSubmit}">Submit</button>
        </div>
      </form>
    `;
  }


  connectedCallback() {
    super.connectedCallback();

    loadProducts(this);
  }


  _onProductChange(event) {
    loadCode(this);
  }

  _onSubmit(event) {
    event.preventDefault();
    collectUserData(this);
  }
}

// Definición del nuevo componente
customElements.define("product-component", ProductComponent);
