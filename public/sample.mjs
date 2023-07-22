const studentSchema = new mongoose.Schema({
  studentID: { type: String, required: true },
  name: { type: String, required: true },
  cnicNumber: { type: String, required: true },
  fatherName: { type: String, required: true },
  age: { type: Number, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  religion: { type: String, enum: ["Muslim", "Non-Muslim"], required: true },
  nationality: { type: String, required: true },
  picture: { type: String, required: true },
  // Add more fields as needed
});

const Student = mongoose.model("Student", studentSchema);

// MongoDB Connection for products
const mongodbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.bykenlf.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(mongodbURI);
let productsCollection;

(async () => {
  try {
    await client.connect();
    const database = client.db('ecom');
    productsCollection = database.collection('products');
    console.log("Connected to MongoDB for products");
  } catch (error) {
    console.error("Error connecting to MongoDB for products:", error.message);
  }
})();

// Define the nanoid generator for products
const productNanoid = customAlphabet('1234567890', 20);

app.get("/", (req, res) => {
  res.send(`"Welcome to AI Chatbot Development Program!"`);
});

app.get("/products", async (req, res) => {
  try {
    const products = await productsCollection.find().toArray();
    res.send({
      message: "all products",
      data: products
    });
  } catch (error) {
    res.status(500).send({ message: "Error fetching products", error: error.message });
  }
});

app.get("/product/:id", async (req, res) => {
  const productId = req.params.id;

  if (isNaN(productId)) {
    res.status(403).send("invalid product id");
    return;
  }

  try {
    const foundProduct = await productsCollection.findOne({ id: productId });

    if (!foundProduct) {
      res.status(404).send({
        message: "product not found"
      });
    } else {
      res.send({
        message: "product found with id: " + foundProduct.id,
        data: foundProduct
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Error finding product", error: error.message });
  }
});

app.post("/product", async (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price || !description) {
    res.status(400).send({
      message: "Required parameter(s) missing. Example JSON request body: { name: 'abc product', price: '$23.12', description: 'abc product description' }"
    });
    return;
  }

  const doc = {
    id: productNanoid(),
    name,
    price,
    description,
  };

  try {
    const result = await productsCollection.insertOne(doc);
    res.status(201).send({ message: "created product", data: result.ops[0] });
  } catch (error) {
    res.status(500).send({ message: "Error adding product", error: error.message });
  }
});

app.put("/product/:id", async (req, res) => {
  const productId = req.params.id;
  const { name, price, description } = req.body;

  if (!name && !price && !description) {
    res.status(403).send(`
      required parameter missing. 
      atleast one parameter is required: name, price or description to complete update
      example JSON request body:
      {
        name: "abc product",
        price: "$23.12",
        description: "abc product description"
      }`);
    return;
  }

  if (isNaN(productId)) {
    res.status(403).send("invalid product id");
    return;
  }

  try {
    const updatedProduct = await productsCollection.findOneAndUpdate(
      { id: productId },
      { $set: { name, price, description } },
      { returnOriginal: false }
    );

    if (!updatedProduct.value) {
      res.status(404).send({
        message: "product not found"
      });
    } else {
      res.send({
        message: "product is updated with id: " + updatedProduct.value.id,
        data: updatedProduct.value
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Error updating product", error: error.message });
  }
});

app.delete("/product/:id", async (req, res) => {
  const productId = req.params.id;

  if (isNaN(productId)) {
    res.status(403).send("invalid product id");
    return;
  }

  try {
    const deletedProduct = await productsCollection.findOneAndDelete({ id: productId });

    if (!deletedProduct.value) {
      res.status(404).send({
        message: "product not found"
      });
    } else {
      res.send({
        message: "product is deleted",
        data: deletedProduct.value
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Error deleting product", error: error.message });
  }
});

// Rest of your CRUD operations for students remain the same

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
