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
