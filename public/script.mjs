const { customAlphabet } = require("nanoid");

const generateProductId = customAlphabet("1234567890", 10);

document.getElementById("productForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("product.name").value;
  const brand = document.getElementById("product.brand").value;
  const model = document.getElementById("product.model").value;
  const price = document.getElementById("product.price").value;

  const newProduct = {
    name: name,
    brand: brand,
    model: model,
    price: parseFloat(price), // Parse price as a float
  };

  try {
    const response = await fetch("/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      document.getElementById("productForm").reset();
      fetchProducts();
    } else {
      alert("Failed to add product. Please try again.");
    }
  } catch (error) {
    console.error("Error adding product:", error);
    alert("Failed to add product. Please try again.");
  }
});

async function fetchProducts() {
  try {
    const response = await fetch("/products");
    const data = await response.json();

    if (response.ok) {
      const productList = data.data;
      const productTable = document.getElementById("productList").getElementsByTagName("tbody")[0];
      productTable.innerHTML = "";

      productList.forEach((product) => {
        const row = productTable.insertRow();
        row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.brand}</td>
          <td>${product.model}</td>
          <td>${product.price}</td>
          <td>
            <button onclick="editProduct('${product.id}')">Edit</button>
            <button onclick="deleteProduct('${product.id}')">Delete</button>
          </td>
        `;
      });
    } else {
      console.log("Error fetching products:", data.message);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

async function deleteProduct(productId) {
  try {
    const response = await fetch(`/products/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchProducts();
    } else {
      alert("Failed to delete product. Please try again.");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Failed to delete product. Please try again.");
  }
}

async function editProduct(productId) {
  // Implement your code here for updating a product
}

// Call fetchProducts when the page loads to populate the table with existing products
document.addEventListener("DOMContentLoaded", fetchProducts);
