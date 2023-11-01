class ProductManager {
  productos = []
  constructor() {
  }
  addProduct(title,description,price,thumbnail,code,stock) {
    let id = 0;
    for (let i = 0; i < this.productos.length; i++) {
      const element = this.productos[i];
      if(element.id > id) {
        id = element.id;
      }
    }
    id++;
    title= title || `Producto ${id}`;
    description= description || `Sin descripción agregada`;
    price= price || 200;
    thumbnail= thumbnail || "imagen-generica.png" ;
    const codeAlready = this.productos.some((x) => (x.code == code)) 
    const codigoGenerico = "ERROR: Este codigo ya se encuentra en la lista de productos"
    code= codeAlready ? codigoGenerico : code || 1000 + id
    stock= stock || 135;
    this.productos.push({id:id, title, description, price, thumbnail, code, stock})
  }
  getProducts() {
    console.log(this.productos)
  }
  getProductById(id) {
    const productoEncontrado = this.productos.find((x) => (x.id == id))
    console.log(productoEncontrado ?? "Not Found");
  }
}

const producto1 = new ProductManager()
producto1.addProduct(`crema`, undefined, 3200, undefined, 30256, 4)
producto1.addProduct(`coca cola`, "bebida coca cola", undefined, "image-coca.jpg", 30256, 256)
producto1.addProduct(undefined, undefined, 200, "image-hielo.jpg", undefined, 3)

producto1.getProducts()