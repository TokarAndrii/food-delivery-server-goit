const http = require("http");
const url = require("url");
const morgan = require("morgan");
const UrlPattern = require('url-pattern');

const defaultRouter = require("../routes/defaultRouter");
const productsRouter = require("../routes/productsRouter");
const productsRouterId = require("../routes/productsRouterId");
const signupRouter = require("../routes/signupRouter");

const startServer = port => {
  const logger = morgan("combined");
  const server = http.createServer((request, response) => {

    const parsedUrl = url.parse(request.url);

    var pattern = new UrlPattern('/products(/:id)');

    const matching = pattern.match(parsedUrl.pathname)

    let id;

    if (matching) {
      id = matching.id
      request.id = id;
    }

    switch (parsedUrl.pathname) {

      case ("/products/"):
        logger(request, response, () => productsRouter(request, response));
        break;

      case (`/products/${id}`):
        logger(request, response, () => productsRouterId(request, response));
        break;

      case "/signup":
        logger(request, response, () => signupRouter(request, response));
        break;

      default:
        logger(request, response, () => defaultRouter(request, response));
    }
  });
  server.listen(port);
  console.log(`server started at port - ${port}`);
};

module.exports = startServer;
