const products = [];

export const getAllProducts = (_req, res) => {
  res.json(products);
};

export const addProduct = (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = {
    id: Date.now().toString(),
    name,
    price,
    description,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const product = products.find((product) => product.id === id);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  product.name = name;
  product.price = price;
  product.description = description;
  res.json(product);
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  products.splice(index, 1);
  res.json({ message: 'Product deleted successfully' });
};
