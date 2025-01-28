const userComponent = document.querySelector("user-component");
export function collectUserData(usercomponent) {
  
  const numInvoice = userComponent.shadowRoot.getElementById("invNumber").value;
  const document = userComponent.shadowRoot.getElementById("idClient").value;
  const name = userComponent.shadowRoot.getElementById("nameClient").value;
  const lastName = userComponent.shadowRoot.getElementById("lastClient").value;
  const address = userComponent.shadowRoot.getElementById("address").value;
  const email = userComponent.shadowRoot.getElementById("email").value;
  const nameProd = usercomponent.shadowRoot.getElementById("selectProd").selectedOptions[0].text;
  const codeProd = usercomponent.shadowRoot.getElementById("codeNumber").value;
  const value = usercomponent.shadowRoot.getElementById("unitValue").value;
  const amount = usercomponent.shadowRoot.getElementById("amountProd").value;

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
    })
  );
}
