import { customAlphabet } from "nanoid";

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

// Define other functions here, like fetchProducts, deleteProduct, and editProduct

async function fetchProducts() {
  // Function implementation
}

async function deleteProduct(productId) {
  // Function implementation
}

async function editProduct(productId) {
  // Function implementation
}

// Call fetchProducts when the page loads to populate the table with existing products
document.addEventListener("DOMContentLoaded", fetchProducts);
