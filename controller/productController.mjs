import { ObjectId } from "mongodb";
import { customAlphabet } from "nanoid";

import { connectToDB } from "../db.mjs";


const nanoid = customAlphabet("1234567890", 20);
const dbPromise = connectToDB();

const productController = {

getAllProducts: async (req, res) => {
    try {
      const db = await connectToDB();
      const productsCollection = db.collection("products");
      const products = await productsCollection.find({}).toArray();
      res.send({
        message: "Showing all products",
        data: products,
      });
    } catch (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  },

  getProductById: async (req, res) => {
    const { id } = req.params;
    try {
      const db = await connectToDB();
      const productsCollection = db.collection("products");
      const query = { _id: new ObjectId(id) };
      const data = await productsCollection.findOne(query);
      if (!data) {
        throw new Error("Product Not Found!");
      }
      res.send(data);
    } catch (err) {
      console.error("Error fetching product:", err);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  },

  createProduct: async (req, res) => {
    const { name, brand, model, price } = req.body;
    const product = {
      _id: nanoid(),
      name: name,
      brand: brand,
      model: model,
      price: price,
    };

    try {
      const db = await connectToDB();
      const productsCollection = db.collection("products");
      const result = await productsCollection.insertOne(product);

      res.status(201).json({ message: "Product created successfully", data: result.ops[0] });
    } catch (err) {
      console.error("Error adding product:", err);
      res.status(500).json({ message: "Failed to add product" });
    }
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { name, brand, model, price } = req.body;
    try {
      const db = await connectToDB();
      const productsCollection = db.collection("products");
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          name: name,
          brand: brand,
          model: model,
          price: price,
        },
      };
      const options = { returnOriginal: false };
      const updatedProduct = await productsCollection.findOneAndUpdate(query, update, options);

      if (!updatedProduct.value) {
        throw new Error("Product Not Found!");
      }

      res.send(updatedProduct.value);
    } catch (err) {
      console.error("Error updating product:", err);
      res.status(500).json({ message: "Failed to update product" });
    }
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const db = await connectToDB();
      const productsCollection = db.collection("products");
      const query = { _id: new ObjectId(id) };
      const deletedProduct = await productsCollection.findOneAndDelete(query);

      if (!deletedProduct.value) {
        throw new Error("Product Not Found!");
      }

      res.send(deletedProduct.value);
    } catch (err) {
      console.error("Error deleting product:", err);
      res.status(500).json({ message: "Failed to delete product" });
    }
  },
};

export default productController;
