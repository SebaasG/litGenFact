export function collectUserData(userComponent) {
  const shadowRoot = userComponent.shadowRoot || userComponent.renderRoot;

  const numInvoice = shadowRoot.getElementById("invNumber").value;
  const document = shadowRoot.getElementById("idClient").value;
  const name = shadowRoot.getElementById("nameClient").value;
  const lastName = shadowRoot.getElementById("lastClient").value;
  const address = shadowRoot.getElementById("address").value;
  const email = shadowRoot.getElementById("email").value;

  // Simulación de otros campos
  const nameProd =
    shadowRoot.getElementById("selectProd")?.selectedOptions[0]?.text || "";
  const codeProd = shadowRoot.getElementById("codeNumber")?.value || "";
  const value = shadowRoot.getElementById("unitValue")?.value || "";
  const amount = shadowRoot.getElementById("amountProd")?.value || "";

  // Enviar los datos a través de un CustomEvent
  userComponent.dispatchEvent(
    new CustomEvent("userDataSubmitted", {
      detail: {
        numInvoice,
        document,
        name,
        lastName,
        address,
        email,
        nameProd,
        codeProd,
        value,
        amount,
      },
      bubbles: true,
      composed: true,
    })
  );
}
