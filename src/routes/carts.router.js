const { Router } = require('express')
const CartManager = require('../../managers/CartManager.js')

const router = Router()

const firstCartManager = new CartManager();


router.post('/', async (req, res) => {
  await firstCartManager.createCart()
  res.status(200).send("Carrito creado con exito!")
})

router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  const carritoEncontrado = await firstCartManager.getCartById(cartId);
  if(carritoEncontrado) {
    res.status(200).json(carritoEncontrado);
  }
  else{
    res.status(404).send('No se encontró ningún carrito!')
  }
})

router.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  await firstCartManager.addProductToCart(cartId, productId);
  res.status(200).send('Se agregó el producto al carrito correctamente!')
})

module.exports = router;