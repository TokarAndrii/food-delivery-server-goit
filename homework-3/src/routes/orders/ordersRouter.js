const fs = require('fs');
const path = require("path");
const users = require('../../../db/users/all-users.json');
const allProducts = require('../../../db/products/all-products.json');


const ordersRouter = (req, res) => {
    const newId = Date.now();
    const { user, products, deliveryType, deliveryAdress } = req.body;
    const order = { user, products, deliveryType, deliveryAdress, id: newId }
    console.log(order, ' order');

    const foundUser = users.users.find(current => current.id === parseInt(user));
    console.log(foundUser, ' - foundUser');

    const { name } = foundUser;



    const findAllProducts = products.map(product => {
        const found = allProducts.find(curr => {
            return curr.id === parseInt(product) ? curr : null
        })

        if (!found) return

        return found;
    })

    console.log(findAllProducts, ' - findAllProducts')
    console.log(findAllProducts.includes(undefined), ' - findAllProducts')

    if (foundUser && !findAllProducts.includes(undefined)) {

        fs.mkdirSync(path.join(__dirname, "../../../db/users/", `${name}`), (err) => {
            if (err) throw err;

            console.log(`folder ${name} created`)
        });

        res.json({ "status": "success", "order": order });
        res.end();
        return;
    }

    res.json({ "status": "failed", "order": null });
    res.end();


}

module.exports = ordersRouter;