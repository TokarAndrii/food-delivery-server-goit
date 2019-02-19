const app = require('express')();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('../config');
const router = require('./routes/router');

// http://localhost:8083 - GET index of api
// http://localhost:8083/products/ - GET all products
// http://localhost:8083/products/19112831 - GET product by id
// http://localhost:8083/products/19112890 - GET product by id with no found results
// http://localhost:8083/products/?ids=19112831, 19112832,  19112833 - GET product bu query ids
// http://localhost:8083/products/?ids=19112890, 19112899 - GET  product bu query ids with no found results
// http://localhost:8083/users/ - POST create new user data: {"name": "Andrii-1", "phone": "09709709797","email": "email@com", "age": 20}
// http://localhost:8083/users/ - GET all users
// http://localhost:8083/orders/ - POST  create order.json at folder users/${UserName}/orders/ data: {"user": 1550492087349,"products": [19112831,19112832],"deliveryType": "deliveryType","deliveryType": "deliveryType",}



app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use('/', router)
    .use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
        next();
    });


const { devPort } = config;
app.listen(devPort, () => console.log(`app started at port -  ${devPort}`));