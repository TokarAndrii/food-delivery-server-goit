const defaultRouter = (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("<h1>Index page</h1>");
  response.end();
};

module.exports = defaultRouter;
