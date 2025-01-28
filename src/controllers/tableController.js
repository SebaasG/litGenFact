export function setTable(tableComponent, tableData) {
    const tbody = tableComponent.shadowRoot.querySelector("tbody");
  
    // Buscar si ya existe un producto con el mismo código
    const existingRow = Array.from(tbody.querySelectorAll("tr")).find((row) => {
      const codeCell = row.querySelector("td:first-child").textContent;
      return codeCell === tableData.codeProd;
    });
  
    if (existingRow) {
      const amountCell = existingRow.querySelector("td:nth-child(4)");
      const subTotalCell = existingRow.querySelector("td:nth-child(5)");
  
      const currentAmount = parseInt(amountCell.textContent) || 0;
      const newAmount = parseInt(currentAmount) + parseInt(tableData.amount);
  
      amountCell.textContent = newAmount;
      subTotalCell.textContent = (
        parseInt(newAmount) * parseInt(tableData.value)
      ).toFixed(2);
    } else {
      const subTotal = tableData.value * tableData.amount;
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
          <td>${tableData.codeProd}</td>
          <td>${tableData.nameProd}</td>
          <td>${tableData.value}</td>
          <td>${tableData.amount}</td>
          <td>${subTotal.toFixed(2)}</td>
          <td><button class="btn btn-danger btnDelete">X</button></td>
        `;
      tbody.appendChild(tableRow);
  
      const btnDelete = tableRow.querySelector(".btnDelete");
      btnDelete.addEventListener("click", () => {
        tableRow.remove();
      });
    }
  }
  