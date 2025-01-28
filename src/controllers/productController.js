export function loadProducts(productComponent) {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((products) => {
        productComponent.updateProducts(products); // Actualiza la lista de productos
      })
      .catch((error) => console.error("Error fetching products:", error));
  }
  
  export function loadCode(productComponent) {
    const selectedValue = productComponent.shadowRoot.getElementById("selectProd").value;
    const codeInput = productComponent.shadowRoot.getElementById("codeNumber");
  
    fetch(`http://localhost:3000/products?id=${selectedValue}`)
      .then((response) => response.json())
      .then((products) => {
        if (products.length > 0) {
          const product = products[0];
          productComponent.updateSelectedProduct(product); // Actualiza el producto seleccionado
        } else {
          alert("Product not found");
        }
      })
      .catch((error) => console.error("Error fetching product:", error));
  }
  