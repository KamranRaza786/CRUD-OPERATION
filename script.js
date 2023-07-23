// scripts.js
const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');

// Function to create a new product item in the frontend
function createProductItem(product) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${product.name}</span>
    <span>$${product.price}</span>
    <button class="editBtn">Edit</button>
    <button class="deleteBtn">Delete</button>
  `;
  const editBtn = li.querySelector('.editBtn');
  const deleteBtn = li.querySelector('.deleteBtn');

  // Edit button click handler
  editBtn.addEventListener('click', () => {
    const newName = prompt('Enter the new product name:', product.name);
    const newPrice = parseFloat(prompt('Enter the new product price:', product.price));
    if (newName && !isNaN(newPrice)) {
      fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName, price: newPrice }),
      })
        .then((response) => response.json())
        .then((updatedProduct) => {
          product.name = updatedProduct.name;
          product.price = updatedProduct.price;
          li.innerHTML = `
            <span>${updatedProduct.name}</span>
            <span>$${updatedProduct.price}</span>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
          `;
        })
        .catch((error) => console.error('Error updating product:', error));
    }
  });

  // Delete button click handler
  deleteBtn.addEventListener('click', () => {
    fetch(`/api/products/${product.id}`, { method: 'DELETE' })
      .then(() => {
        li.remove();
      })
      .catch((error) => console.error('Error deleting product:', error));
  });

  return li;
}

// Fetch all products from the server and display them in the frontend
fetch('/api/products')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
      productList.appendChild(createProductItem(product));
    });
  })
  .catch((error) => console.error('Error fetching products:', error));

// Form submit handler to add a new product
productForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const productName = document.getElementById('productName').value;
  const productPrice = parseFloat(document.getElementById('productPrice').value);
  if (productName && !isNaN(productPrice)) {
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: productName, price: productPrice }),
    })
      .then((response) => response.json())
      .then((newProduct) => {
        productList.appendChild(createProductItem(newProduct));
        productForm.reset();
      })
      .catch((error) => console.error('Error adding product:', error));
  }
});
