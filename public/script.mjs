// script.mjs
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890', 20)

document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("teleForm");
  const productList = document.getElementById("product-list");

  const apiUrl = "/products";

  async function fetchProducts() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data && data.data && data.data.length) {
        displayProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  function displayProducts(products) {
    productList.innerHTML = "";

    products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.brand}</td>
        <td>${product.model}</td>
        <td>${product.price}</td>
        <td>
          <button data-id="${product.id}" class="edit-btn">Edit</button>
          <button data-id="${product.id}" class="delete-btn">Delete</button>
        </td>
      `;

      productList.appendChild(row);
    });
  }

  async function addProduct(event) {
    event.preventDefault();

    const productForm = event.target;
    const name = productForm.elements["name"].value;
    const brand = productForm.elements["brand"].value;
    const model = productForm.elements["model"].value;
    const price = productForm.elements["price"].value;

    const product = {
      id: nanoid(),
      name: name,
      brand: brand,
      model: model,
      price: price,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.status === 201) {
        fetchProducts();
        productForm.reset();
      } else {
        console.error("Error adding product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  async function deleteProduct(productId) {
    try {
      const response = await fetch(`/product/${productId}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        fetchProducts();
      } else {
        console.error("Error deleting product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  async function handleButtonClick(event) {
    const target = event.target;

    if (target.classList.contains("delete-btn")) {
      const productId = target.dataset.id;
      deleteProduct(productId);
    }
  }

  productForm.addEventListener("submit", addProduct);
  productList.addEventListener("click", handleButtonClick);

  // Fetch and display products on page load
  fetchProducts();
});
