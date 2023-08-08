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
                        <p>Price: ${eachProduct.price} $ Only</p>
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
