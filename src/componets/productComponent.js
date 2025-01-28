import { LitElement, html, css } from 'lit';
import { loadProducts, loadCode } from "../controllers/productController.js"; // Importa las funciones del controlador

class ProductComponent extends LitElement {
  constructor() {
    super();
    this.products = []; // Lista de productos
    this.selectedProduct = null; // Producto seleccionado
  }

  static styles = css`
    :host {
      display: block;
    }
  `;

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
            <input type="text" class="form-control" .value="${this.selectedProduct ? this.selectedProduct.value : ''}" disabled>
          </div>
          <div class="flex-grow-1">
            <label for="amountProd" class="form-label">Amount</label>
            <input type="number" class="form-control" id="amountProd">
          </div>
        </div>

        <div class="d-flex justify-content-center"> 
          <button type="submit" id="submitBtn" class="btn btn-primary mx-auto mt-3">Submit</button>
        </div>
      </form>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    loadProducts(this); // Carga los productos al montar el componente
  }

  _onProductChange() {
    loadCode(this); // Actualiza los valores del código cuando se selecciona un producto
  }

  updateProducts(products) {
    this.products = products;
    this.requestUpdate();
  }

  updateSelectedProduct(product) {
    this.selectedProduct = product;
    this.requestUpdate();
  }
}

customElements.define("product-component", ProductComponent);
