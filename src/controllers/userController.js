export function collectUserData(userComp) {
  // Obtener datos del shadowRoot
  const shadow = userComp.shadowRoot;

  // Asegúrate de que los elementos existen antes de acceder a ellos
  const numInvoice = shadow.getElementById("invNumber").value;
  const document = shadow.getElementById("idClient").value;
  const name = shadow.getElementById("nameClient").value;
  const lastName = shadow.getElementById("lastClient").value;
  const address = shadow.getElementById("address").value;
  const email = shadow.getElementById("email").value;
  
  // Aquí asumo que tienes los elementos selectProd, codeNumber, unitValue, amountProd
  const nameProd = shadow.getElementById("selectProd") ? shadow.getElementById("selectProd").selectedOptions[0].text : '';
  const codeProd = shadow.getElementById("codeNumber") ? shadow.getElementById("codeNumber").value : '';
  const value = shadow.getElementById("unitValue") ? shadow.getElementById("unitValue").value : '';
  const amount = shadow.getElementById("amountProd") ? shadow.getElementById("amountProd").value : '';

  // Emitir evento personalizado con los datos
  userComp.dispatchEvent(
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
