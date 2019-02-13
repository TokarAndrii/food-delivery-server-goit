const https = require("https");
const url = require("url");
const fs = require("fs")
const morgan = require("morgan");
const UrlPattern = require("url-pattern");

const defaultRouter = require("../routes/defaultRouter");
const productsRouter = require("../routes/productsRouter");
const productsRouterId = require("../routes/productsRouterId");
const signupRouter = require("../routes/signupRouter");


var options = {
  key: fs.readFileSync(__dirname + '../../../server.key'),
  cert: fs.readFileSync(__dirname + '../../../server.crt')
};

const startServer = port => {
  const logger = morgan("combined");
  const server = https.createServer(options, (request, response) => {
    const parsedUrl = url.parse(request.url);

    var pattern = new UrlPattern("/products(/:id)");

    const matching = pattern.match(parsedUrl.pathname);

    let id;

    if (matching) {
      id = matching.id;
      request.id = id;
    }

    switch (parsedUrl.pathname) {
      //https://localhost:8082/products/
      //https://localhost:8082/products/?ids='19112831, 19112832, 19112833'
      //https://localhost:8082/products/?category="pizza"
      case "/products/":
        logger(request, response, () => productsRouter(request, response));
        break;

      //https://localhost:8082/products/19112833
      case `/products/${id}`:
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
