const fs = require('fs');
const path = require("path");
const users = require('../../../db/users/all-users.json');
const allProducts = require('../../../db/products/all-products.json');


const ordersRouter = (req, res) => {
    const newId = Date.now();
    const { user, products, deliveryType, deliveryAdress } = req.body;
    const order = { user, products, deliveryType, deliveryAdress, id: newId }

    const foundUser = users.users.find(current => current.id === parseInt(user));

    const { name } = foundUser;



    const findAllProducts = products.map(product => {
        const found = allProducts.find(curr => {
            return curr.id === parseInt(product) ? curr : null
        })

        if (!found) return

        return found;
    })

    if (foundUser && !findAllProducts.includes(undefined)) {

        fs.mkdirSync(path.join(__dirname, "../../../db/users/", `${name}`), (err) => {
            if (err) throw err;
            console.log(`folder ${name} created`)
        });

        fs.writeFile(path.join(__dirname, `../../../db/users/${name}/`, 'orders.json'), JSON.stringify(order),
            (err) => {
                if (err) throw err;
                console.log("The order has been saved!");
            })


        res.json({ "status": "success", "order": order });
        res.end();
        return;


    }

    res.json({ "status": "failed", "order": null });
    res.end();


}

module.exports = ordersRouter;