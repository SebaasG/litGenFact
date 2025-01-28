export function loadProducts(productComponent) {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((products) => {
        const productSelect =
          productComponent.shadowRoot.getElementById("selectProd");
        productSelect.innerHTML = "";
  
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Choose product...";
        productSelect.appendChild(defaultOption);
  
        // Iterar sobre los productos usando forEach nativo de JavaScript
        products.forEach((product) => {
          const option = document.createElement("option");
          option.value = product.id;
          option.textContent = product.name;
          productSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching products:", error));
  }
  
  export function loadCode(productComponent) {
    const selectedValue =
      productComponent.shadowRoot.getElementById("selectProd").value;
    const codeInput = productComponent.shadowRoot.getElementById("codeNumber");
  
    codeInput.value = selectedValue;
    alert("This is codeinput value: " + codeInput.value);
  
    fetch(`http://localhost:3000/products?id=${selectedValue}`)
      .then((response) => response.json())
      .then((products) => {
        if (products.length > 0) {
          const product = products[0];
          const value = product.value;
  
          const inputValue =
            productComponent.shadowRoot.getElementById("unitValue");
          inputValue.value = value;
        } else {
          alert("Product not found");
        }
      })
      .catch((error) => console.error("Error fetching product:", error));
  }
  