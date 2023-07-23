// server.mjs
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// Sample in-memory data store for products
let products = [];

// Middleware to parse JSON data
app.use(bodyParser.json());

// Endpoints for CRUD operations
// Create a new product
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required fields.' });
  }
  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  return res.status(201).json(newProduct);
});

// Read all products
app.get('/api/products', (req, res) => {
  return res.json(products);
});

// Update a product by ID
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found.' });
  }
  product.name = name;
  product.price = price;
  return res.json(product);
});

// Delete a product by ID
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter((p) => p.id !== parseInt(id));
  return res.json({ message: 'Product deleted successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
