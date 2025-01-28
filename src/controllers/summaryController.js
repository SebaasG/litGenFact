export function dataTable(tableBody, summaryComponent) {
  let subtotal = 0.00;

  // Calculamos el subtotal basado en los productos de la tabla
  Array.from(tableBody.rows).forEach(row => {
    const price = parseFloat(row.cells[2].textContent); // Asegúrate de que sea la columna correcta
    const quantity = parseInt(row.cells[3].textContent, 10); // Asegúrate de que sea la columna correcta
    subtotal += price * quantity;
  });

  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  // Actualizar el resumen en el componente
  summaryComponent.updateInvoiceSummary(subtotal, iva, total);
}



export function observeTableChanges(tableBody, callback) {
  if (!tableBody) {
    console.error("No se encontró el cuerpo de la tabla.");
    return;
  }

  const observer = new MutationObserver(() => {
    callback(); // Llamar a la función de callback que recalcula el total
  });

  observer.observe(tableBody, { childList: true, subtree: true }); // Observamos los cambios en los hijos de la tabla

  return observer;
}

export async function saveInvoice(summaryComponent) {
  const dataString = localStorage.getItem("dataParcial");

  if (!dataString) {
    console.error("No hay datos almacenados en localStorage.");
    return;
  }

  try {
    const data = JSON.parse(dataString);
    const { numInvoice, document } = data;

    // Obtener la fecha y hora actual en formato 'YYYY-MM-DD HH:MM:SS'
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10);
    const formattedTime = now.toLocaleTimeString("es-CO", {
      hour12: false, 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit",
    });

    const fullDateTime = `${formattedDate} ${formattedTime}`;

    // Obtener el total desde el componente Lit
    const total = summaryComponent.total;

    const invoiceData = {
      invoiceId: numInvoice,
      clientId: document.trim(), // Asegurando que el campo clientId no sea vacío por espacios
      total: total, // Ahora el total es un número entero
      date: fullDateTime,
    };

    console.log("Enviando datos:", invoiceData);

    const response = await fetch("http://localhost:3000/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    });

    if (response.ok) {
      console.log("Factura guardada correctamente");
    } else {
      console.error("Error al guardar la factura");
    }
  } catch (error) {
    console.error("Error procesando los datos:", error);
  }
}
