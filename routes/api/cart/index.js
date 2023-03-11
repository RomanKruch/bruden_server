const {
  onAddToCart,
  onRemoveFromCart,
} = require('../../../controllers/cartController');
const express = require('express');
const router = express.Router();
const guard = require('../../../helpers/guard');

router.post('/', guard, onAddToCart);

router.delete('/:productId', guard, onRemoveFromCart);

module.exports = router;
