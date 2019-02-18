const express = require('express');
const router = express.Router();
const indexRouter = require('./indexRouter');
const productsRouter = require('./productsRouter');
const productRouter = require('./productRouter');
const usersCreateRouter = require('./usersCreateRouter')


router
    .get('/', indexRouter)
    .get('/products/', productsRouter)
    .get('/products/:id', productRouter)
    .post('/users/', usersCreateRouter)


module.exports = router;