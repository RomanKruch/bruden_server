const {
  onAddToLiked,
  onRemoveFromLiked,
} = require('../../../controllers/likedController');
const express = require('express');
const router = express.Router();
const guard = require('../../../helpers/guard');

router.post('/', guard, onAddToLiked);

router.delete('/:productId', guard, onRemoveFromLiked);

module.exports = router;
