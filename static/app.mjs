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

            document.querySelector('#name').value = '';
            document.querySelector('#brand').value = '';
            document.querySelector('#model').value = '';
            document.querySelector('#price').value = '';
            document.querySelector('#description').value = '';

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
                    <p>Brand: ${eachProduct.brand}</p>
                    <p>Model: ${eachProduct.model}</p>
                    <p>Price: ${eachProduct.price}</p>
                    <p>Id: ${eachProduct._id}</p>
                    <p>Description: ${eachProduct.description}</p>
                    <br>
                    <button class="icon-button delete-button"type="button"
                    onclick="deleteProduct('${eachProduct._id}') ">
                    <i class="fas fa-trash"></i> Delete Product
                    </button>
                   
                    <button class="icon-button edit-button"type="button"
                    onclick='editProduct(${JSON.stringify(eachProduct)})'>
                    <i class="fas fa-pencil-alt"></i> Edit Product
                    </button>
                    
                    <hr>
                    <div id="box_${eachProduct._id}"></div>

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
        Name: <input required type="text" id="name_${product._id}" value='${product.name}'>
        <br>
        Brand: <input required type="text" id="brand_${product._id}" value='${product.brand}'>
        <br>
        Model: <input required type="text" id="model_${product._id}" value='${product.model}'>
        <br>
        Price: <input required type="number" id="price_${product._id}" value='${product.price}'>
        <br>
        Description: <input required maxlength="200" type="text" id="description_${product._id}" 
        value='${product.description}'>
        <br>
            <button class="update-button" type="submit">
                <i class="fas fa-check"></i> Update Product
            </button>
            <button class="cancel-button" type="button" onclick="cancelEdit('${product._id}')">
                <i class="fas fa-times"></i> Cancel
            </button>
        </form>
        `
};
window.updateProduct = async (event, id) => {
    event.preventDefault();
    console.log("id: ", id);

    const name = document.querySelector(`#name_${id}`).value;
    const brand = document.querySelector(`#brand_${id}`).value;
    const model = document.querySelector(`#model_${id}`).value;
    const price = document.querySelector(`#price_${id}`).value;
    const description = document.querySelector(`#description_${id}`).value;

    try {
        const resp = await axios.put(`http://localhost:3000/product/${id}`, {
            name, brand, model, price, description
        });
        console.log("resp: ", resp.data);
        getAllProducts();

    } catch (e) {
        console.error("Error getting products");
    }
};
window.cancelEdit = (productId) => {
    const editBox = document.querySelector(`#box_${productId}`);
    editBox.innerHTML = '';
};


window.deleteProduct = async (id) => {
    try {
        console.log("id: ", id);
        const resp = await axios.delete(`http://localhost:3000/product/${id}`);
        console.log("resp: ", resp.data);
        getAllProducts();

    } catch (e) {
        console.error("Error getting products");
    }
};
