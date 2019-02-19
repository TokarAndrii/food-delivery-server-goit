const indexRouter = (req, res) => {
    res.set("Content-Type", "text/html");
    res.send("<h1>Title page of api</h1>");
}

module.exports = indexRouter;