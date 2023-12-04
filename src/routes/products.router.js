const { Router } = require('express')
const ProductManager = require('../../managers/ProductManager.js');

const router = Router()

const firstManager = new ProductManager();
async function inicializarProductos() {
  const productos = await firstManager.getProducts()
  firstManager.productos = productos;
}

inicializarProductos();

router.get('/', async (req, res) => {
  const products = await firstManager.getProducts();
  const limit = parseInt(req.query.limit);
  if(isNaN(limit)) {
    res.json(products)
  }else {
    const productsLimit = products.slice(0, limit);
    res.status(200).render('home.hbs', {
      products: productsLimit
    })
  }
})

router.get('/:pid', async (req, res) => {
  const productId = req.params.pid;
  const productoEncontrado = await firstManager.getProductById(productId);
  if(productoEncontrado) {
    res.status(200).json(productoEncontrado);
  }
  else{
    res.status(404).send('No se encontró ningún producto!')
  }
})

router.post('/', async (req, res) => {
  let newProduct = req.body;
  await firstManager.addProduct(newProduct.title,newProduct.category,newProduct.description,newProduct.price,newProduct.thumbnail,newProduct.code,newProduct.stock,newProduct.status)
  res.status(200).send("Producto agregado con exito!")
})

router.put('/:pid', async (req,res) => {
  const productId = parseInt(req.params.pid);
  let updateData = req.body;
  try {
    await firstManager.updateProduct(productId, updateData.newTitle, updateData.newCategory, updateData.newDescription, updateData.newPrice, updateData.newThumbnail, updateData.newCode, updateData.newStock, updateData.newStatus);
  } catch(error) {
    res.status(404).send('No se pudo actualizar el producto!')
  }
})

router.delete('/:pid', async (req, res) => {
  const productId = req.params.pid;
  await firstManager.deleteProduct(productId)
  res.status(200).send(`Producto con id: ${productId} eliminado exitosamente`)
})

module.exports = router;