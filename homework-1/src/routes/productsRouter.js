const queryString = require("query-string");
const allProducts = require("../db/products/all-products.json");
const url = require("url");
const productsRouter = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (parsedUrl.query) {
    const key = parsedUrl.query.split("=")[0];

    if (key !== "ids") {
      let value = parsedUrl.query.split("=")[1];
      value = value.split("%")[1];

      let valueSliced = value.match(/[A-Za-z]/g).join("");

      const foundProductsByQuery = allProducts.filter(current =>
        current.categories.includes(valueSliced)
      );

      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(
        JSON.stringify({ status: "success", products: foundProductsByQuery })
      );
      response.end();
      return;
    }
  }

  let parsedQS = queryString.parse(request.url);

  let val = Object.values(parsedQS).toString();
  if (val) {
    val = val.split(",");
    let ids = [];
    val.map(current => {
      let numb = current.match(/\d/g);
      numb = numb.join("");
      ids.push(numb);
    });

    let result = [];
    ids.map(curr => {
      let found = allProducts.find(
        currentProduct => currentProduct.id === parseInt(curr)
      );
      if (found) return result.push(found);
    });

    console.log(result);

    if (result.length === 0) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify({ status: "no products", products: [] }));
      response.end();
    } else {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify({ status: "success", products: result }));
      response.end();
    }
  } else {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(allProducts));
    response.end();
  }
};

module.exports = productsRouter;
