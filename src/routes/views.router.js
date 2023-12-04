const { Router } = require('express');
const ProductManager = require('../../managers/ProductManager.js');

const router = Router();

const firstManager = new ProductManager();
async function inicializarProductos() {
  const productos = await firstManager.getProducts()
  firstManager.productos = productos;
}

inicializarProductos();


//  http://localhost:8080/views/
router.get('/', async(req, res) => {
  const products = await firstManager.getProducts();
  res.render('home.hbs', {
    products : products,
    style: "index.css"
  })
})

//  http://localhost:8080/views/realtimeproducts
router.get('/realtimeproducts', (req,res) => {
  res.render('realTimeProducts.hbs', {
    title: 'Productos Tiempo Real',
    style: "index.css"
  })
})

module.exports = router;