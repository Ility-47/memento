const authService = require('./auth.service');

// Регистрация
const register = async (req, res) => {
  try {
    const { email, password, name, lastname, age, subscription, description } = req.body;

    // Валидация обязательных полей
    if (!email || !password || !name || !lastname) {
      return res.status(400).json({
        success: false,
        message: 'Email, пароль, имя и фамилия обязательны'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Пароль должен содержать минимум 6 символов'
      });
    }

    // Валидация подписки, если указана
    if (subscription && !['free', 'basic', 'premium'].includes(subscription)) {
      return res.status(400).json({
        success: false,
        message: 'Подписка должна быть: free, basic или premium'
      });
    }

    // Валидация возраста, если указан
    if (age !== undefined && (age < 0 || !Number.isInteger(age))) {
      return res.status(400).json({
        success: false,
        message: 'Возраст должен быть неотрицательным целым числом'
      });
    }

    const result = await authService.register({
      email,
      password,
      name,
      lastname,
      age,
      subscription,
      description
    });

    res.status(201).json({
      success: true,
      message: 'Пользователь успешно зарегистрирован',
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Ошибка при регистрации'
    });
  }
};

// Авторизация
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Валидация
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email и пароль обязательны'
      });
    }

    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: 'Успешная авторизация',
      data: result
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || 'Ошибка при авторизации'
    });
  }
};

// Получение текущего пользователя
const getMe = async (req, res) => {
  try {
    const user = await authService.getCurrentUser(req.user.userId);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || 'Пользователь не найден'
    });
  }
};

module.exports = {
  register,
  login,
  getMe
};
