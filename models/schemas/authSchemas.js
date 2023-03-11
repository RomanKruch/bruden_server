const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT = 8;

const authSchema = new Schema(
  {
    name: {
      type: String,
      default: 'Guest',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    cart: {
      type: [{ type: Schema.Types.ObjectId, ref: 'product' }],
      default: [],
    },
    liked: {
      type: [{ type: Schema.Types.ObjectId, ref: 'product' }],
      default: [],
    },
  },
  { versionKey: false },
);

authSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT);
  this.password = await bcrypt.hash(this.password, salt, null);
  next();
});

authSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Auth = model('auth', authSchema);

module.exports = Auth;
