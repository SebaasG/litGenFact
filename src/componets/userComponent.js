import { LitElement, html, css } from "lit";

export class UserComponent extends LitElement {
  constructor() {
    super();
    this.id = Date.now().toString(15);
    this.attachShadow({ mode: "open" });
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      />
      <form id="user-form">
        <form id="user-form">
          <div class="d-flex justify-content-center">
            <h1>Invoice</h1>
          </div>
          <div class="mb-3">
            <label for="invNumber" class="form-label mt-3"
              >Invoice Number</label
            >
            <input
              type="text"
              class="form-control"
              id="invNumber"
              .value="${this.id}"
              disabled
            />
          </div>
          <div class="flex-grow-1">
            <label for="idClient" class="form-label">Document</label>
            <input type="text" class="form-control" id="idClient" />
          </div>
          <div class="d-flex gap-3">
            <div class="flex-grow-1">
              <label for="nameClient" class="form-label">Name</label>
              <input type="text" class="form-control" id="nameClient" />
            </div>
            <div class="flex-grow-1">
              <label for="lastClient" class="form-label">Last Name</label>
              <input type="text" class="form-control" id="lastClient" />
            </div>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input type="text" class="form-control" id="address" />
            <div id="addressHelp" class="form-text">
              We'll never share your address with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
        </form>
      </form>
    `;
  }
}

customElements.define("user-component", UserComponent);
