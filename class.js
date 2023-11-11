class ProductManager {
  productos = []
  constructor() {
  }
  addProduct(title,description,price,thumbnail,code,stock) {
    if(title != "" && description!= "" && price != null && thumbnail!= "" && stock != null){
      let id = 0;
      for (let i = 0; i < this.productos.length; i++) {
        const element = this.productos[i];
        if(element.id > id) {
          id = element.id;
        }
      }
      id++;
      code= code
      const codeAlready = this.productos.some((x) => (x.code == code)) 
      if (codeAlready){
        console.error("Ya existe un producto con este código!")
        return
      }
      title= title;
      description= description;
      price= price || 200;
      thumbnail= thumbnail;
      stock= stock;
      this.productos.push({id:id, title, description, price, thumbnail, code, stock})
      console.log(`Agregado con exito, con el codigo: ${code}`)
      }
      else {
        console.log("Ingrese datos validos!")
      }
    }
  getProducts() {
    console.log(this.productos)
  }
  getProductById(id) {
    const productoEncontrado = this.productos.find((x) => (x.id == id))
    console.log(productoEncontrado ?? "Not Found");
  }
}

const firstManager = new ProductManager()
firstManager.addProduct(`crema`, "asd", 3200, "asd", 30256, 4)

firstManager.getProducts()