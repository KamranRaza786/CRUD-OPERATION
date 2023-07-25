async function editProduct(productId) {
  try {
    const response = await fetch(`/products/${productId}`);
    const data = await response.json();

    if (response.ok) {
      const product = data;
      const nameInput = document.getElementById("product.name");
      const brandInput = document.getElementById("product.brand");
      const modelInput = document.getElementById("product.model");
      const priceInput = document.getElementById("product.price");

      // Prepopulate the form fields with the product data
      nameInput.value = product.name;
      brandInput.value = product.brand;
      modelInput.value = product.model;
      priceInput.value = product.price;

      // Add an "Update" button to submit the edited data
      const updateButton = document.createElement("button");
      updateButton.textContent = "Update";
      updateButton.addEventListener("click", async () => {
        const updatedProduct = {
          name: nameInput.value,
          brand: brandInput.value,
          model: modelInput.value,
          price: parseFloat(priceInput.value),
        };

        try {
          const updateResponse = await fetch(`/products/${productId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          });

          if (updateResponse.ok) {
            fetchProducts();
          } else {
            alert("Failed to update product. Please try again.");
          }
        } catch (error) {
          console.error("Error updating product:", error);
          alert("Failed to update product. Please try again.");
        }
      });

      // Replace the existing "Add Product" button with the "Update" button
      const addProductButton = document.getElementById("add-product-button");
      addProductButton.parentNode.replaceChild(updateButton, addProductButton);
    } else {
      console.log("Error fetching product details:", data.message);
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    alert("Failed to fetch product details. Please try again.");
  }
}
