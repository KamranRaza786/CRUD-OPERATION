// index.js

// ... (previous code)

// Read operation
app.get('/products', (req, res) => {
    Product.find({}, (err, products) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error fetching products');
      } else {
        res.status(200).send(products);
      }
    });
  });
  
  // Update operation
  app.put('/products/:id', (req, res) => {
    Product.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, price: req.body.price },
      { new: true },
      (err, product) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error updating product');
        } else {
          console.log('Product updated:', product);
          res.status(200).send(product);
        }
      }
    );
  });
  
  // Delete operation
  app.delete('/products/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, product) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting product');
      } else {
        console.log('Product deleted:', product);
        res.status(200).send(product);
      }
    });
  });
  
  // ... (previous code)
  