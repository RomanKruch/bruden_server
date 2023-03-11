const express = require('express');
const {
  onAddProduct,
  onAddTag,
} = require('../../../controllers/adminController');
const upload = require('../../../helpers/upload');

const validate = require('../../../models/product/validate');
const router = express.Router();
const guard = require('../../../helpers/guard');

router.post(
  '/product',
  upload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'largeImg', maxCount: 1 },
  ]),
  validate.product,
  onAddProduct,
);
router.post('/tag', upload.single('img'), onAddTag);

module.exports = router;
