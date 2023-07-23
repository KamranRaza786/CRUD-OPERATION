// script.mjs
import { customAlphabet } from "nanoid";

// Function to generate a unique product ID
const generateProductId = customAlphabet('1234567890', 10);

document.getElementById("teleForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const price = document.getElementById("price").value;

  // Generate the product ID using nanoid
  const id = generateProductId();

  // Create a new product object
  const newProduct = {
    id: id,
    name: name,
    brand: brand,
    model: model,
    price: price,
  };

  // Make a POST request to the server to add the new product
  const response = await fetch("/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });

  if (response.ok) {
    // Clear the form inputs after successful submission
    document.getElementById("name").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("model").value = "";
    document.getElementById("price").value = "";

    // Refresh the product list in the table
    fetchProducts();
  } else {
    // Handle error if product addition fails
    alert("Failed to add product. Please try again.");
  }
});

// script.mjs
// ... (previous code)

// Function to fetch all products from the server
async function fetchProducts() {
  try {
    const response = await fetch("/products");
    const data = await response.json();

    if (response.ok) {
      // Display the products in the table
      const productList = data.data;
      const productTable = document.getElementById("product-list");
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
      // Handle error if fetching products fails
      console.log("Error fetching products:", data.message);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Function to refresh the products table after adding, editing, or deleting a product
function refreshProductTable() {
  fetchProducts();
}

// ... (other functions and event listeners)

// Call the fetchProducts function when the page loads to display the products
fetchProducts();

