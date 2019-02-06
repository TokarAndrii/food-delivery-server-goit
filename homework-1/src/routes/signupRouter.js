const qs = require("querystring");
const fs = require("fs");
const path = require("path");

const signUpRouter = (request, response) => {
  if (request.method === "POST") {
    let body = "";
    let name;

    request.on("data", function(data) {
      body += data;
    });

    request.on("end", function() {
      let userData = JSON.parse(body);

      const { username } = userData;
      name = username;

      fs.writeFile(
        path.join(__dirname, "../db/users/", `${username}.json`),
        body,
        err => {
          if (err) throw err;

          console.log("The file has been saved!");
        }
      );

      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify({ user: userData, status: "success" }));
      response.end();
    });
  }
};

module.exports = signUpRouter;
