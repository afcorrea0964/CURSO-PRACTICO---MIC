const express = require('express');
const path = require('path');

const app = express();

// Servir archivos estáticos desde la carpeta 'frontend_products' en la ruta '/products'
app.use('/products', express.static(path.join(__dirname, 'frontend_products')));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Frontend corriendo en http://localhost:${PORT}/products`);
});
