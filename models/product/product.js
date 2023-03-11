const Product = require('../schemas/productSchema');
const Tag = require('../schemas/tagSchema')

const getProducts = async ({
  perPage = 6,
  page = 1,
  sortBy,
  sortByDesc,
  filter,
  tags,
}) => {
  const normalizedFilter = filter ? filter.split('|').map(item => +item): [0, 9999];
  const normalizedTags = tags?.split('|');
  const results = await Product.paginate(
    {
      $and: [
        { price: { $gt: normalizedFilter[0] } },
        { price: { $lt: normalizedFilter[1] } },

        { ...(normalizedTags ? { tag: { $in: normalizedTags } } : {}) },
      ],
    },
    {
      limit: perPage,
      page,
      populate: 'tag',
      sort: {
        ...(sortBy ? { [sortBy]: 1 } : {}),
        ...(sortByDesc ? { [sortByDesc]: -1 } : {}),
      },
    },
  );
  return {
    totalPages: results.totalPages,
    page: results.page,
    perPage: results.limit,
    products: results.docs,
  };
};

const getAllTags = async () => {
  return await Tag.find();
};

module.exports = { getProducts,getAllTags };
