const http = require("http");
const url = require("url");
const morgan = require("morgan");

const defaultRouter = require("../routes/defaultRouter");
const productsRouter = require("../routes/productsRouter");
const signupRouter = require("../routes/signupRouter");

const startServer = port => {
  const logger = morgan("combined");
  const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url);

    switch (parsedUrl.pathname) {
      case "/products":
        logger(request, response, () => productsRouter(request, response));
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
