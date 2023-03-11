const express = require('express');
const router = express.Router();
const {
  onRegister,
  onLogin,
  onLogout,
  onRefresh,
} = require('../../../controllers/authController');
const validate = require('../../../models/auth/validate');
const guard = require('../../../helpers/guard');

router.post('/register', validate.auth, onRegister);
router.post('/login', validate.auth, onLogin);
router.post('/logout', guard, onLogout);
router.get('/refresh', guard, onRefresh);

module.exports = router;
