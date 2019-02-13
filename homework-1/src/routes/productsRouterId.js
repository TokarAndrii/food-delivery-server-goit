const allProducts = require("../db/products/all-products.json");
const productsRouterId = (request, response) => {

    const foundProduct = allProducts.filter(cur => cur.id === parseInt(request.id));
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(foundProduct));
    response.end();
};

module.exports = productsRouterId;