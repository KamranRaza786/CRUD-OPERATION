import express from 'express';
import { nanoid } from 'nanoid';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

// Sample initial data
let products = [
  //...
];

// Serve the index.html page for the root URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// Get all products
app.get('/api/v1/products', (req, res) => {
  res.json({ data: products });
});

// Create a new product
app.post('/api/v1/product', (req, res) => {
  //...
});

// Delete a product
app.delete('/api/v1/product/:id', (req, res) => {
  //...
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
