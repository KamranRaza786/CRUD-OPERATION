import { customAlphabet } from "nanoid";

const generateProductId = customAlphabet("abcd1230", 10);

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
    price: parseFloat(price), 
  };

  try {
    const response = await fetch("/products", {
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

// Call fetchProducts when the page loads to populate the table with existing products
document.addEventListener("DOMContentLoaded", fetchProducts);

async function fetchProducts() {
  console.log("Fetching products...");
  try {
    const response = await fetch("/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    console.log("Fetched products:", data);
    // Update the table with the fetched products here
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

async function deleteProduct(productId) {
  console.log("Deleting product with ID:", productId);
  try {
    // Function implementation
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

async function editProduct(productId) {
  console.log("Editing product with ID:", productId);
  try {
    // Function implementation
  } catch (error) {
    console.error("Error editing product:", error);
  }
}
