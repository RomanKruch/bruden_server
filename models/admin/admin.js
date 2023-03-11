const Product = require('../schemas/productSchema');
const Tag = require('../schemas/tagSchema');

const addProduct = async body => {
  let product =  await Product.create({
    ...body,
    img: {
      small: {
        ref: body.imgRef,
        id: body.imgIdCloud
      },
      large: {
        ref: body.largeImgRef,
        id: body.largeImgIdCloud
      }
    }
  });

  return product.populate({path: 'tag'})
};

const findProductByTitle = async title => {
  return await Product.findOne({ title });
};

const findTagByName = async name => {
  return await Tag.findOne({ name });
};

const addTag = async tag => {
  return await Tag.create(tag);
};

module.exports = {
  findTagByName,
  addTag,
  addProduct,
  findProductByTitle,
};

