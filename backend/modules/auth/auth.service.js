const jwt = require('jsonwebtoken');
const User = require('./user.model');

// Генерация JWT токена
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your_super_secret_jwt_key',
    {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    }
  );
};

// Регистрация нового пользователя
const register = async ({ email, password, name, lastname, age, subscription, description }) => {
  try {
    // Проверка существования пользователя
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Пользователь с таким email уже существует');
    }

    // Создание нового пользователя
    const userData = {
      email,
      password,
      name,
      lastname
    };

    // Добавляем опциональные поля, если они указаны
    if (age !== undefined) userData.age = age;
    if (subscription) userData.subscription = subscription;
    if (description) userData.description = description;

    const user = new User(userData);
    await user.save();

    // Генерация токена
    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        age: user.age,
        subscription: user.subscription,
        description: user.description,
        friends: user.friends,
        albumIds: user.albumIds,
        createdAt: user.createdAt
      },
      token
    };
  } catch (error) {
    throw error;
  }
};

// Авторизация пользователя
const login = async (email, password) => {
  try {
    // Поиск пользователя по email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Неверный email или пароль');
    }

    // Проверка пароля
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Неверный email или пароль');
    }

    // Генерация токена
    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        age: user.age,
        subscription: user.subscription,
        description: user.description,
        friends: user.friends,
        albumIds: user.albumIds,
        createdAt: user.createdAt
      },
      token
    };
  } catch (error) {
    throw error;
  }
};

// Получение информации о текущем пользователе
const getCurrentUser = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  generateToken
};
