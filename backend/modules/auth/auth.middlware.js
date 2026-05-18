const jwt = require('jsonwebtoken');

// Middleware для проверки JWT токена
const authenticate = (req, res, next) => {
  try {
    // Получение токена из заголовка Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Токен доступа не предоставлен'
      });
    }

    // Извлечение токена
    const token = authHeader.substring(7);

    // Проверка токена
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your_super_secret_jwt_key'
    );

    // Добавление информации о пользователе в запрос
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Недействительный токен'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Токен истек'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Ошибка аутентификации'
    });
  }
};

module.exports = {
  authenticate
};
