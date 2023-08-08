document.querySelector("#ProductForm")
.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const brand = document.querySelector('#brand').value;
    const model = document.querySelector('#model').value;
    const price = document.querySelector('#price').value;
    const description = document.querySelector('#description').value;

    try {
        const resp = await axios.post(`http://localhost:3000/product`, {
            name: name,
            brand,
            model,
            price,
            description
        });
        console.log("resp: ", resp.data);
        getAllProducts();

    } catch (e) {
        console.error("Error getting products");
    }

})


const getAllProducts = async () => {
    try {
    
        const resp = await axios.get("http://localhost:3000/products");
        console.log("resp: ", resp.data.data);
    
        let productsDiv = document.querySelector("#products")
        productsDiv.innerHTML = "";

    resp.data.data.map(eachProduct => {
        productsDiv.innerHTML += `<div class="card">
                    
                    <h2>Name: ${eachProduct.name}</h2>
                    <p>brand: ${eachProduct.brand}</p>
                    <p>model: ${eachProduct.model}</p>
                    <p>Price: ${eachProduct.price}</p>
                    <p>id: ${eachProduct._id}</p>
                    <p>Description: ${eachProduct.description}</p>
                    
                    <button class="icon-button edit-button"type="button">
                    <i class="fas fa-pencil-alt"></i>
                    Edit Product
                    </button>
    
                    <button class="icon-button delete-button"type="button">
                    <i class="fas fa-trash"></i>
                    Delete Product
                    </button>
                    </div>
                    </div>`
    })
} catch (e) {
    console.error("Error getting products");
}
};
window.addEventListener("load", getAllProducts);


window.editProduct = async (product) => {

console.log("product: ", product);

let box = document.querySelector(`#box_${product._id}`);
box.innerHTML = '';

box.innerHTML = `<form onsubmit="updateProduct(event, '${product._id}')">
    name: <input required type="text" id="name_${product._id}" value='${product.name}'>
    <br>
    price: <input required type="number" id="price_${product._id}" value='${product.price}'>
    <br>
    description: <input required maxlength="200" type="text" id="description_${product._id}" value='${product.description}'>
    <br>
    <button type="submit">Update</button>
    </form>
    `
}
window.updateProduct = async (event, id) => {
event.preventDefault();
console.log("id: ", id);

const name = document.querySelector(`#name_${id}`).value;
const price = document.querySelector(`#price_${id}`).value;
const description = document.querySelector(`#description_${id}`).value;

try {
    const resp = await axios.put(`http://localhost:3000/product/${id}`, {
        name, price, description
    });
    console.log("resp: ", resp.data);
    getAllProducts();

} catch (e) {
    console.error("Error getting products");
}
}


window.deleteProduct = async (id) => {
try {
    console.log("id: ", id);
    const resp = await axios.delete(`http://localhost:3000/product/${id}`);
    console.log("resp: ", resp.data);
    getAllProducts();

} catch (e) {
    console.error("Error getting products");
}
}