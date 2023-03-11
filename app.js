const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/api/auth');
const cartRouter = require('./routes/api/cart');
const likedRouter = require('./routes/api/liked');
const adminRouter = require('./routes/api/admin');
const productRouter = require('./routes/api/products');
const tagRouter = require('./routes/api/tag')
const { HTTP } = require('./helpers/constants');
require('dotenv').config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/liked', likedRouter);
app.use('/api/admin', adminRouter);
app.use('/api/products', productRouter);
app.use('/api/tag', tagRouter)

app.use((_req, res) => {
  res.status(HTTP.NOT_FOUND).json({ message: 'Not found' });
});

app.use((err, _req, res, _next) => {
  res.status(err.status || HTTP.SERVER_ERROR).json({ massage: err });
});

module.exports = app;
