const socket = io();

//ADD PRODUCT
let agregarNuevoProducto = document.querySelector('#addProduct')
agregarNuevoProducto.addEventListener('click', (e) => {
  let productName = document.querySelector('#productName').value;
  let productCategory = document.querySelector('#productCategory').value;
  let productDescription = document.querySelector('#productDescription').value;
  let productPrice = parseInt(document.querySelector('#productPrice').value);
  let productThumbnail = document.querySelector('#productThumbnail').value;
  let productCode = document.querySelector('#productCode').value;
  let productStock = parseInt(document.querySelector('#productStock').value);
  let productStatus = document.querySelector('input[name="status"]:checked').value === 'true'; 

  let newProduct = {
    title: productName, 
    category: productCategory, 
    description: productDescription,
    price: productPrice,
    thumbnail: productThumbnail,
    code: productCode,
    stock: productStock,
    status: productStatus
  }
  e.preventDefault();
  socket.emit('addProduct', newProduct);
})

//GET PRODUCT BY ID
let buttonGetProductId = document.querySelector('#getProductButton');
buttonGetProductId.addEventListener('click', (e) => {
  let foundProductDiv = document.querySelector('#foundProduct');
  let idProduct = parseInt(document.querySelector('#getProductId').value);
  socket.emit('getProductById', idProduct);
  socket.on('productFound', productFound => {
    foundProductDiv.innerHTML= `
    <h2>${productFound.title}</h2>
    <p>Producto ${productFound.category}</p>
    <p>${productFound.description}</p>
    <p>$${productFound.price}</p>
    <p>Código: ${productFound.code}</p>
    <p>Stock: ${productFound.stock} unid.</p>
    `
  })
  e.preventDefault();
})

//UPDATE PRODUCT BY ID
let buttonUpdateProduct = document.querySelector('#updateProduct');
buttonUpdateProduct.addEventListener('click', (e) => {
  let udpatedProductDiv = document.querySelector('#updatedProduct');
  let idProduct = parseInt(document.querySelector('#updatedProductId').value);
  let updatedProductName = document.querySelector('#updatedProductName').value || undefined;
  let updatedProductCategory = document.querySelector('#updatedProductCategory').value || undefined;
  let updatedProductDescription = document.querySelector('#updatedProductDescription').value || undefined;
  let updatedProductPrice = parseInt(document.querySelector('#updatedProductPrice').value) || undefined;
  let updatedProductThumbnail = document.querySelector('#updatedProductThumbnail').value || undefined;
  let updatedProductCode = document.querySelector('#updatedProductCode').value || undefined;
  let updatedProductStock = parseInt(document.querySelector('#updatedProductStock').value) || undefined;
  let updatedProductStatus = document.querySelector('input[name="updatedStatus"]:checked').value === 'true'; 

  let updatedProduct = {
    id: idProduct,
    newTitle: updatedProductName,
    newCategory: updatedProductCategory, 
    newDescription: updatedProductDescription,
    newPrice: updatedProductPrice,
    newThumbnail: updatedProductThumbnail,
    newCode: updatedProductCode,
    newStock: updatedProductStock,
    newStatus: updatedProductStatus
  }
  e.preventDefault();
  socket.emit('updateProduct', updatedProduct);
  socket.on('finalUpdateProduct', (finalProduct) => {
    udpatedProductDiv.innerHTML = `
    <h1>Producto id: ${finalProduct.id} actualizado con éxito!</h1>
    <div>
    <h2>${finalProduct.title}</h2>
    <p>Producto ${finalProduct.category}</p>
    <p>${finalProduct.description}</p>
    <p>$${finalProduct.price}</p>
    <p>Imagen: ${finalProduct.thumbnail}</p>
    <p>Código: ${finalProduct.code}</p>
    <p>Stock: ${finalProduct.stock} unid.</p>
    <p>Status: ${finalProduct.status}</p>
    </div>
    `
  })
})

//DELETE PRODUCT BY ID
let buttonDeleteProduct = document.querySelector('#deleteProduct');
let deletedProductDiv = document.querySelector('#deletedProduct');
buttonDeleteProduct.addEventListener('click', (e) => {
  let idProduct = parseInt(document.querySelector('#deleteProductId').value);
  e.preventDefault();
  socket.emit('deleteProduct', idProduct);
  socket.on('successfulDelete', (deleteSuccess) => {
  deletedProductDiv.innerHTML = `
  <h2>${deleteSuccess}</h2>
  `
  })
})

//PRODUCTOS EN TIEMPO REAL CON CADA CAMBIO
socket.on('realTimeUpdate', (allProducts) => {
  let allProductsRealTimeSection = document.querySelector('#allProductsRealTime');
  allProductsRealTimeSection.innerHTML = '';
  allProducts.forEach(product => {
    let productItem = document.createElement('div');
    productItem.innerHTML = `
    <img src="" alt="${product.thumbnail || "No se agrego ninguna imagen del producto"}">
    <h3>${product.title}</h3>
    <p>ID: ${product.id}</p>
    <p>Producto ${product.category}</p>
    <p>${product.description}</p>
    <p>$ ${product.price}</p>
    <p>Código: ${product.code}</p>
    <p>Stock: ${product.stock} unid.</p>
    <p>Status: ${product.status}</p>
    `
    productItem.classList.add("productItem")
    allProductsRealTimeSection.appendChild(productItem);
  })
})