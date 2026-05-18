const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { authenticate } = require('./auth.middlware');

// Регистрация
router.post('/register', authController.register);

// Авторизация
router.post('/login', authController.login);

// Получение информации о текущем пользователе (требует аутентификации)
router.get('/me', authenticate, authController.getMe);

module.exports = router;
