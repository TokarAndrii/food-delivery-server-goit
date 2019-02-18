const products = require('../../db/products/all-products.json')
const productRouter = (req, res) => {
    const { id } = req.params;
    if (id) {
        const foundProduct = products.filter(product => product.id === parseInt(id));

        if (foundProduct.length > 0) {
            res.status(200)
            res.json({ products: foundProduct, message: "Ok" });
            res.end();
        }

        else {
            res.status(200)
            res.json({ products: foundProduct, message: `Not found product with id - ${id}` });
            res.end();
        }

    }


}

module.exports = productRouter;