// server.mjs
import express from "express";
import { customAlphabet } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nanoid = customAlphabet("1234567890", 20);

app.use(express.static(path.join(__dirname, "public"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".css")) {
      res.setHeader("Content-Type", "text/css");
    }
  },
}));

const products = [
  {
    id: nanoid(), // always a number
    name: "abc product",
    brand: "Sample Brand",
    model: "Sample Model",
    price: "$23.12",
    description: "abc product description",
  },
];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/products", (req, res) => {
  res.send({
    message: "all products",
    data: products,
  });
});

app.get("/product/:id", (req, res) => {
  // ... (same as your code)

  // Rest of the routes (post, put, delete) are the same as your code
  // ...

  // Handle not found route
  app.use((req, res) => {
    res.status(404).send("Page not found");
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
