const { addProduct, findProductByTitle, addTag, findTagByName } = require('../models/admin/admin');
const { HTTP } = require('../helpers/constants');
const fs = require('fs').promises;
const { promisify } = require('util');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const uploadCloud = promisify(cloudinary.uploader.upload);

const onAddProduct = async (req, res, next) => {
  try {
    const product = await findProductByTitle(req.body.title);

    if (product) {
      return res.status(HTTP.CONFLICT).json({
        status: 'error',
        code: HTTP.CONFLICT,
        data: {
          massage: 'Product already here!'
        }
      })
    }

    const { public_id: imgIdCloud, secure_url: imgRef } = await uploadCloud(req.files.img[0].path, {
      folder: 'Bruden',
      transformation: { width: 260, height: 260, crop: 'fill' },
    });
    await fs.unlink(req.files.img[0].path);

    const { public_id: largeImgIdCloud, secure_url: largeImgRef } = await uploadCloud(req.files.largeImg[0].path, {
      folder: 'Bruden',
      transformation: { width: 430, height: 560, crop: 'fill' },
    });
    await fs.unlink(req.files.largeImg[0].path);

    const newProduct = await addProduct({...req.body, imgIdCloud, imgRef, largeImgIdCloud, largeImgRef});

    return res.status(HTTP.CREATE).json({
      status: 'success',
      code: HTTP.CREATE,
      data: {
        product: newProduct
      }
    });
  } catch (e) {
    next(e);
  }
};

const onAddTag = async (req, res, next) => {
  try {
    console.log(1);
    const tag = await findTagByName(req.body.name);

    if (tag) {
      return res.status(HTTP.CONFLICT).json({
        status: 'error',
        code: HTTP.CONFLICT,
        data: {
          massage: 'Product already here!'
        }
      })
    }
    console.log(req.file);
    const { public_id: imgId, secure_url: img } = await uploadCloud(req.file.path, {
      folder: 'Bruden',
      transformation: { width: 360, height: 290, crop: 'fill' },
    });
    await fs.unlink(req.file.path);
    console.log(3);
    const newTag = await addTag({...req.body, imgId, img});

    return res.status(HTTP.CREATE).json({
      status: 'success',
      code: HTTP.CREATE,
      data: {
        tag: newTag
      }
    });
  } catch (e) {
    next(e)
  }
}

module.exports = {
  onAddProduct,
  onAddTag,
};
