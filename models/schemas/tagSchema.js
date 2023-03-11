const { Schema, model } = require('mongoose');

const tagSchema = new Schema(
  {
    img: {
      type: String,
      default: null,
    },
    imgId: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      require: [true, 'Tag is required'],
    },
  },
  { versionKey: false },
);

const Tag = model('tag', tagSchema);

module.exports = Tag;
