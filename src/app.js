const express = require('express');
const handlebars = require('express-handlebars');
const ProductManager = require('../managers/ProductManager.js')

const firstManager = new ProductManager();
async function inicializarProductos() {
  const productos = await firstManager.getProducts()
  firstManager.productos = productos;
}

inicializarProductos();

const productsRouter = require('./routes/products.router.js');
const carritoRouter = require('./routes/carts.router.js');
const viewsRouter = require('./routes/views.router.js');
const { Server } = require('socket.io');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'))

app.use('/api/products', productsRouter);
app.use('/api/carts', carritoRouter);
app.use('/views', viewsRouter)


app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

const serverHttp = app.listen(8080, () => {
  console.log(`Server is running on http://localhost:8080`)
})

const io = new Server(serverHttp);

io.on('connection', async socket => {
  console.log('Nuevo cliente conectado');
  const allProducts = await firstManager.getProducts();
  socket.emit('realTimeUpdate', allProducts);
  socket.on('addProduct', async (newProduct) => {
  await firstManager.addProduct(
    newProduct.title,
    newProduct.category,
    newProduct.description,
    newProduct.price,
    newProduct.thumbnail,
    newProduct.code,
    newProduct.stock,
    newProduct.status)
    console.log('Producto agregado con exito!')
    const allProducts= await firstManager.getProducts();
    socket.emit('realTimeUpdate', allProducts);
  })
  socket.on('getProductById',async (id) => {
    const productFound = await firstManager.getProductById(id);
    socket.emit('productFound', productFound);
  })
  socket.on('updateProduct', async (updatedProduct) => {
    await firstManager.updateProduct(
      updatedProduct.id,
      updatedProduct.newTitle,
      updatedProduct.newCategory,
      updatedProduct.newDescription,
      updatedProduct.newPrice,
      updatedProduct.newThumbnail,
      updatedProduct.newCode,
      updatedProduct.newStock,
      updatedProduct.newStatus
    )
    const finalProduct = await firstManager.getProductById(updatedProduct.id);
    socket.emit('finalUpdateProduct', finalProduct)
    const allProducts= await firstManager.getProducts();
    socket.emit('realTimeUpdate', allProducts);
  })
  socket.on('deleteProduct', async(idProduct) => {
    await firstManager.deleteProduct(idProduct);
    const deleteSuccess = `Producto de id ${idProduct} eliminado con éxito!`
    socket.emit('successfulDelete', deleteSuccess)
    const allProducts= await firstManager.getProducts();
    socket.emit('realTimeUpdate', allProducts);
  })
})
