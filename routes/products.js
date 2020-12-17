const router = require('express').Router();
const productsRepo = require('../repositories/products');
const productsIndexTemplate = require('../views/products/index');

router.get('/', async (req, res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({products: products}));
});


module.exports = router;
