const express = require('express')
const ProductManager = require('./ProductManager')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const firstManager = new ProductManager();

app.get('/products', async (req, res) => {
  const products = await firstManager.getProducts();
  const limit = parseInt(req.query.limit);
  if(isNaN(limit)) {
    res.json(products);
  }else {
    const productsLimit = products.slice(0, limit);
    res.json(productsLimit)
  }
})

app.get('/products/:pid', async (req, res) => {
  const productId = req.params.pid;
  const productoEncontrado = await firstManager.getProductById(productId);
  if(productoEncontrado) {
    res.json(productoEncontrado);
  }
  else{
    res.status(404).send('No se encontró ningún producto!')
  }
})

app.listen(5050, () => {
  console.log(`Server is running on http://localhost:5050`)
})