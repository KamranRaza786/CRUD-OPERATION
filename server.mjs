import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { customAlphabet } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";
import cors from "cors"; // Import the cors middleware

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nanoid = customAlphabet("1234567890", 20);

const mongodbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.CLUSTER_NAME}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(mongodbURI);

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    app.use(express.static(path.join(__dirname, "public")));
    app.use(express.json());

    // Use the CORS middleware
    app.use(cors());

    app.get("/products", async (req, res) => {
      try {
        const db = client.db(process.env.DATABASE_NAME);
        const productsCollection = db.collection("products");

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

    // Add other routes here

    app.use((req, res) => {
      res.status(404).send("Page not found");
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

startServer();
