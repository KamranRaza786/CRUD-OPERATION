import { customAlphabet } from "nanoid";

const generateProductId = customAlphabet('1234567890', 10);

document.getElementById("teleForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("product.name").value;
  const brand = document.getElementById("product.brand").value;
  const model = document.getElementById("product.model").value;
  const price = document.getElementById("product.price").value;

  const id = generateProductId();

  const newProduct = {
    id: id,
    name: name,
    brand: brand,
    model: model,
    price: price,
  };

  const response = await fetch("/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });

  if (response.ok) {
    document.getElementById("product.name").value = "";
    document.getElementById("product.brand").value = "";
    document.getElementById("product.model").value = "";
    document.getElementById("product.price").value = "";

    fetchProducts();
  } else {
    alert("Failed to add product. Please try again.");
  }
});

async function fetchProducts() {
  try {
    const response = await fetch("/products");
    const data = await response.json();

    if (response.ok) {
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
      console.log("Error fetching products:", data.message);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchProducts();
