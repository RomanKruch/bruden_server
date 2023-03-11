const express = require('express');
const { onGetProducts } = require('../../../controllers/productController');

const router = express.Router();
const guard = require('../../../helpers/guard');

router.get('/', onGetProducts);


module.exports = router;
