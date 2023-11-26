const fs = require('fs');

class ProductManager {
  constructor() {}
  productos = [];

  async getProducts() {
    const productosArchivadosString = await fs.promises.readFile('productos.json', 'utf-8');
    const productosArchivadosArray = JSON.parse(productosArchivadosString);
    return productosArchivadosArray;
  }
  async addProduct(title, category, description, price, thumbnail, code, stock, status) {
    if(title != "" && description!= "" && category!= "" && price != null && code !== null && typeof code === 'string' && stock != null && typeof status === 'boolean'){
      let id = 0;
      for (let i = 0; i < this.productos.length; i++) {
        const element = this.productos[i];
        if(element.id > id) {
          id = element.id;
        }
      }
      id++;
      status = typeof status === 'boolean' ? status : true
      code = code;
      const codeAlready = this.productos.some((x) => (x.code == code));
      if (codeAlready){
        console.error("Ya existe un producto con este código!");
        return;
      }
      const path =`./productos.json`;
      this.productos.push({id:id, title, category, description, price, thumbnail, code, stock, status, path})
      const productosString = JSON.stringify(this.productos, null, 2);
      await fs.promises.writeFile('productos.json', productosString);
    }else {
      console.log("Ingrese datos validos!");
    }
  }
  async getProductById(id) {
    const productosArchivadosString = await fs.promises.readFile('productos.json', 'utf-8');
    const productosArchivadosArray = JSON.parse(productosArchivadosString);
    const productoEncontrado = productosArchivadosArray.find((x) => (x.id == id));
    return productoEncontrado;
  }
  async deleteProduct(id) {
    const productosArchivadosString = await fs.promises.readFile('productos.json', 'utf-8');
    const productosArchivadosArray = JSON.parse(productosArchivadosString);
    const productoEncontrado = productosArchivadosArray.find((x) => (x.id == id));
    if(!productoEncontrado) {
      console.log(`No se encontró ningún producto con el id: ${id}!`)
      return;
    }
    const nuevosProductos = productosArchivadosArray.filter(x => x.id != id);
    this.productos = nuevosProductos;
    const nuevosProductosString = JSON.stringify(nuevosProductos, null, 2)
    await fs.promises.writeFile('productos.json', nuevosProductosString);
  }
  async updateProduct(id, newTitle, newCategory, newDescription, newPrice, newThumbnail, newCode, newStock, newStatus) {
    const productosArchivadosString = await fs.promises.readFile('productos.json', 'utf-8');
    const productosArchivadosArray = JSON.parse(productosArchivadosString);
    const productoEncontrado = productosArchivadosArray.find((x) => (x.id == id));
    if(!productoEncontrado) {
      console.log(`No se encontró ningún producto con el id: ${id}!`)
      return;
    }
    const nuevosProductos = productosArchivadosArray.filter(x => x.id != id);
    if(newTitle != "" && newDescription!= "" && newPrice != null && newThumbnail!= "" && newStock != null){
      const updateStatus = typeof newStatus === 'boolean' ? newStatus : true;
      const productoActualizado = {
        id:id, 
        title: newTitle || productoEncontrado.title,
        category: newCategory || productoEncontrado.category,
        description: newDescription || productoEncontrado.description, 
        price: newPrice || productoEncontrado.price, 
        thumbnail: newThumbnail || productoEncontrado.thumbnail, 
        code: newCode || productoEncontrado.code, 
        stock: newStock || productoEncontrado.stock,
        status: updateStatus
      }
      if(productoEncontrado.code != newCode) {
        const codeAlready = this.productos.some((x) => (x.code == newCode));
        if (codeAlready){
          console.error("Ya existe un producto con este código!");
          return;
        }
      } 
      nuevosProductos.push(productoActualizado);
      this.productos = nuevosProductos;
    } else {
      console.log("Ingrese datos validos!");
      return;
    }
    const nuevosProductosString = JSON.stringify(nuevosProductos, null, 2)
    await fs.promises.writeFile('productos.json', nuevosProductosString);
  }
}


module.exports = ProductManager;