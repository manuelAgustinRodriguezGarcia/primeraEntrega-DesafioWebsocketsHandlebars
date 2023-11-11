const fs = require('fs');

class ProductManager {
  constructor() {}
  productos = [];
  async addProduct(title,description,price,thumbnail,code,stock) {
    if(title != "" && description!= "" && price != null && thumbnail!= "" && stock != null){
      let id = 0;
      for (let i = 0; i < this.productos.length; i++) {
        const element = this.productos[i];
        if(element.id > id) {
          id = element.id;
        }
      }
      id++;
      code = code
      const codeAlready = this.productos.some((x) => (x.code == code));
      if (codeAlready){
        console.error("Ya existe un producto con este código!");
        return;
      }
      const path =`./productos.json`
      this.productos.push({id:id, title, description, price, thumbnail, code, stock, path})
      const productosString = JSON.stringify(this.productos, null, 2);
      await fs.promises.writeFile('productos.json', productosString);
    }else {
      console.log("Ingrese datos validos!")
    }
  }
  async getProducts() {
    const productosArchivadosString = await fs.promises.readFile('productos.json', 'utf-8');
    const productosArchivadosArray = JSON.parse(productosArchivadosString);
    return productosArchivadosArray;
  }
  async getProductById(id) {
    const productosArchivadosString = await fs.promises.readFile('productos.json', 'utf-8');
    const productosArchivadosArray = JSON.parse(productosArchivadosString);
    const productoEncontrado = productosArchivadosArray.find((x) => (x.id == id));
    console.log(productoEncontrado ?? "Not Found");
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
  async updateProduct(id, newTitle, newDescription, newPrice, newThumbnail, newCode, newStock) {
    const productosArchivadosString = await fs.promises.readFile('productos.json', 'utf-8');
    const productosArchivadosArray = JSON.parse(productosArchivadosString);
    const productoEncontrado = productosArchivadosArray.find((x) => (x.id == id));
    if(!productoEncontrado) {
      console.log(`No se encontró ningún producto con el id: ${id}!`)
      return;
    }
    const nuevosProductos = productosArchivadosArray.filter(x => x.id != id);
    if(newTitle != "" && newDescription!= "" && newPrice != null && newThumbnail!= "" && newStock != null){
      const productoActualizado = {
        id:id, 
        title: newTitle || productoEncontrado.title, 
        description: newDescription || productoEncontrado.description, 
        price: newPrice || productoEncontrado.price, 
        thumbnail: newThumbnail || productoEncontrado.thumbnail, 
        code: newCode || productoEncontrado.code, 
        stock: newStock || productoEncontrado.stock
      }
      const codeAlready = this.productos.some((x) => (x.code == newCode));
      if (codeAlready){
        console.log("Ya existe un producto con este código!");
        return;
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

async function PruebaAsincronica() {
  const firstManager = new ProductManager();
  await firstManager.addProduct("Coca-cola","Bebida",500,"foto-coca.png", 100, 50);
  await firstManager.addProduct("Harina","Derivado del trigo",200,"foto-harina.png", 101, 50);
  await firstManager.addProduct("Papas","Hortaliza",300,"foto-papas.png", 110, 50);
  await firstManager.addProduct("Huevos","Producto de granja",2100,"foto-huevos.png", 111, 50);
  await firstManager.addProduct("Aceite","Derivado del girasol",1500,"foto-aceite.png", 1000, 50);
  await firstManager.addProduct("Acelga","Verdura",350,"foto-acelga.png", 1001, 50)
}
PruebaAsincronica();