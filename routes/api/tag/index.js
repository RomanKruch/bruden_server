const express = require('express');
const { onGetTags } = require('../../../controllers/productController');

const router = express.Router();
const guard = require('../../../helpers/guard');

router.get('/', onGetTags);

module.exports = router;
