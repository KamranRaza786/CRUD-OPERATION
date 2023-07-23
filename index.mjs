import { getAllProducts, addProduct, updateProduct, deleteProduct } from './server.mjs';

const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const descriptionInput = document.getElementById('description');

const renderProducts = () => {
  productList.innerHTML = '';
  getAllProducts().then((data) => {
    data.forEach((product) => {
      const item = document.createElement('li');
      item.innerHTML = `<strong>${product.name}</strong> - ${product.price} - ${product.description}
        <button class="updateBtn" data-id="${product.id}">Update</button>
        <button class="deleteBtn" data-id="${product.id}">Delete</button>`;
      productList.appendChild(item);
    });
  });
};

const clearFormInputs = () => {
  nameInput.value = '';
  priceInput.value = '';
  descriptionInput.value = '';
};

productForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const price = priceInput.value.trim();
  const description = descriptionInput.value.trim();
  if (name && price && description) {
    addProduct({ name, price, description }).then(() => {
      renderProducts();
      clearFormInputs();
    });
  }
});

productList.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('updateBtn')) {
    const id = target.dataset.id;
    const name = prompt('Enter updated name:');
    const price = prompt('Enter updated price:');
    const description = prompt('Enter updated description:');
    if (name && price && description) {
      updateProduct(id, { name, price, description }).then(() => renderProducts());
    }
  } else if (target.classList.contains('deleteBtn')) {
    const id = target.dataset.id;
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id).then(() => renderProducts());
    }
  }
});

renderProducts();
