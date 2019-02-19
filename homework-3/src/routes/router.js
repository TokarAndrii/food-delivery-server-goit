const express = require('express');
const router = express.Router();
const indexRouter = require('./indexRouter');
const productsRouter = require('./products/productsRouter');
const productRouter = require('./products/productRouter');
const usersCreateRouter = require('./users/usersCreateRouter');
const usersRouter = require('./users/usersRouter');
const userRouter = require('./users/userRouter');
const ordersRouter = require('./orders/ordersRouter')


router
    .get('/', indexRouter)
    .get('/products/', productsRouter)
    .get('/products/:id', productRouter)
    .post('/users/', usersCreateRouter)
    .get('/users/', usersRouter)
    .get('/users/:id', userRouter)
    .post('/orders/', ordersRouter)


module.exports = router;