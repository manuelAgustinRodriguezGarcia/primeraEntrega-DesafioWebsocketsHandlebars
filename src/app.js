const express = require('express');

const productsRouter = require('./routes/products.router.js');
const carritoRouter = require('./routes/carts.router.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter);
app.use('/api/carts', carritoRouter);

app.listen(5050, () => {
  console.log(`Server is running on http://localhost:5050`)
})