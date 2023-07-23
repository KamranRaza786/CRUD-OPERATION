// server.mjs
import express from "express";
import { customAlphabet } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nanoid = customAlphabet("1234567890", 20);

// MongoDB URI and database name
const mongodbURI = "mongodb://localhost:27017/ecom"; // Update with your MongoDB connection URI
const dbName = "ecom";

// Create a MongoDB client
const client = new MongoClient(mongodbURI, { useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

let products = [
  {
    id: nanoid(), // always a number
    name: "abc product",
    brand: "Sample Brand",
    model: "Sample Model",
    price: "$23.12",
    description: "abc product description",
  },
];

// Handle GET request to fetch all products
app.get("/products", async (req, res) => {
  try {
    const db = client.db(dbName);
    const productsCollection = db.collection("products");

    // Fetch all products from the "products" collection
    const products = await productsCollection.find({}).toArray();

    res.send({
      message: "all products",
      data: products,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Handle POST request to add a new product
app.post("/product", async (req, res) => {
  const product = {
    id: nanoid(),
    name: req.body.name,
    brand: req.body.brand,
    model: req.body.model,
    price: req.body.price,
  };

  try {
    const db = client.db(dbName);
    const productsCollection = db.collection("products");
    
    // Insert the new product into the "products" collection
    const result = await productsCollection.insertOne(product);

    res.status(201).json({ message: "created product", data: result.ops[0] });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Failed to add product" });
  }
});

// ... (similarly, handle PUT and DELETE requests)

// Handle not found route
app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
