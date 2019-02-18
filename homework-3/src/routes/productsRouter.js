const products = require('../../db/products/all-products.json')

const productsRouter = (req, res) => {
    const { ids } = req.query;

    if (!ids) {
        res.status(200)
        res.json({ products: products, message: "Ok" })
        res.end();
        return;
    }

    else {
        const idsArray = ids.split(',');
        for (let i = 0; i < idsArray.length; i += 1) {
            idsArray[i] = parseInt(idsArray[i])
        }
        console.log(idsArray);

        let result = [];
        idsArray.map(curr => {
            let found = products.find(
                currentProduct => currentProduct.id === curr
            );
            if (found) return result.push(found);
        });


        if (result.length === 0) {
            res.status(200)
            res.json({ products: '[]', message: `Not found products with ids - ${idsArray}` });
            res.end();
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ status: "success", products: result }));
            res.end();
        }
    }






}

module.exports = productsRouter;