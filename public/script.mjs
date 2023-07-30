document.addEventListener("DOMContentLoaded", fetchProducts);

document.getElementById("productForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const price = document.getElementById("price").value;

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

async function fetchProducts() {
  try {
    const response = await fetch("/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();

    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    for (const product of data.data) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product._id}</td>
        <td>${product.name}</td>
        <td>${product.brand}</td>
        <td>${product.model}</td>
        <td>${product.price}</td>
        <td>
          <button onclick="editProduct('${product._id}')">Edit</button>
          <button onclick="deleteProduct('${product._id}')">Delete</button>
        </td>
      `;
      productList.appendChild(row);
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
  try {
    // You can implement the logic to edit the product here
    // For example, you can show a modal with a form to edit the product details
    // and then make a PUT request to update the product
  } catch (error) {
    console.error("Error editing product:", error);
  }
}
