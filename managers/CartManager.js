const fs = require('fs');

class CartManager {
  constructor(){
    this.carritos = [];
  }

  async createCart() {
    const carritosArchivadosString = await fs.promises.readFile('carrito.json', 'utf-8');
    const carritosArchivadosArray = JSON.parse(carritosArchivadosString);

    const id = carritosArchivadosArray.length + 1
    const newCart = {
      id: id,
      products: []
    }
    carritosArchivadosArray.push(newCart)
    const carritosString = JSON.stringify(carritosArchivadosArray, null, 2);
    await fs.promises.writeFile('carrito.json', carritosString);
  }

  async getCartById(id) {
    const carritosArchivadosString = await fs.promises.readFile('carrito.json', 'utf-8');
    const carritosArchivadosArray = JSON.parse(carritosArchivadosString);
    const carritoEncontrado = carritosArchivadosArray.find((x) => (x.id == id));
    return carritoEncontrado.products;
  }

  async addProductToCart(cartId, productId) {
  const carritosArchivadosString = await fs.promises.readFile('carrito.json', 'utf-8');
  const carritosArchivadosArray = JSON.parse(carritosArchivadosString);

  const carritoEncontradoIndex = carritosArchivadosArray.findIndex((x) => (x.id == cartId));

  if (carritoEncontradoIndex !== -1) {
    const carritosCopia = [...carritosArchivadosArray];
    const carritoEncontrado = { ...carritosArchivadosArray[carritoEncontradoIndex] };

    const productIndex = carritoEncontrado.products.findIndex((p) => parseInt(p.pid) === parseInt(productId));

    if (productIndex !== -1) {
      carritoEncontrado.products[productIndex].quantity += 1;
    } else {
      carritoEncontrado.products.push({ pid: parseInt(productId), quantity: 1 });
    }
    carritosCopia[carritoEncontradoIndex] = carritoEncontrado;

    const nuevaListaString = JSON.stringify(carritosCopia, null, 2);
    await fs.promises.writeFile('carrito.json', nuevaListaString);
  }
  else {
    console.log(`No se encontró ningún carrito con el id: ${cartId}`)
  }
  }
}

module.exports = CartManager;