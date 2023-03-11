const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new Schema(
  {
    img: {
      small: {
        ref: {
          type: String,
          default: null,
        },
        id: {
          type: String,
          default: null,
        },
      },
      large: {
        ref: {
          type: String,
          default: null,
        },
        id: {
          type: String,
          default: null,
        },
      },
    },
    title: {
      type: String,
      required: [true, 'Title required'],
    },
    price: {
      type: Number,
      required: [true, 'Price required'],
    },
    totalQty: {
      type: Number,
      default: 1,
    },
    tag: {
      type: Schema.Types.ObjectId,
      ref: 'tag',
    },
    description: {
      type: String,
      required: [true, 'Description required'],
    },
  },
  { versionKey: false },
);

productSchema.plugin(mongoosePaginate);

const Product = model('product', productSchema);

module.exports = Product;
