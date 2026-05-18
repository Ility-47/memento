import { useState } from 'react';
import { authService } from './authService';

/**
 * Кастомный хук для управления состоянием и логикой авторизации
 */
export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Ошибки по полям для формы авторизации
  const [loginErrors, setLoginErrors] = useState({
    email: '',
    password: ''
  });

  // Ошибки по полям для формы регистрации
  const [registerErrors, setRegisterErrors] = useState({
    email: '',
    password: '',
    name: '',
    lastname: '',
    age: ''
  });

  // Состояние для формы авторизации
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Состояние для формы регистрации
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    name: '',
    lastname: '',
    age: ''
  });

  // Обработка изменения полей формы авторизации
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку поля при вводе
    if (loginErrors[name]) {
      setLoginErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Обработка изменения полей формы регистрации
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    
    // Фильтрация цифр из имени и фамилии
    let filteredValue = value;
    if (name === 'name' || name === 'lastname') {
      filteredValue = value.replace(/[0-9]/g, '');
    }
    
    setRegisterData(prev => ({
      ...prev,
      [name]: filteredValue
    }));
    // Очищаем ошибку поля при вводе
    if (registerErrors[name]) {
      setRegisterErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Валидация формы авторизации
  const validateLogin = () => {
    const errors = {};
    let isValid = true;

    if (!loginData.email.trim()) {
      errors.email = 'Email обязателен для заполнения';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      errors.email = 'Некорректный формат email';
      isValid = false;
    }

    if (!loginData.password) {
      errors.password = 'Пароль обязателен для заполнения';
      isValid = false;
    }

    setLoginErrors(errors);
    return isValid;
  };

  // Отправка формы авторизации
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setLoginErrors({ email: '', password: '' });

    // Валидация на клиенте
    if (!validateLogin()) {
      setLoading(false);
      return;
    }

    try {
      const data = await authService.login(loginData);

      if (data.success) {
        authService.saveAuthData(data.data);
        setSuccess('Успешная авторизация!');
        console.log('Пользователь авторизован:', data.data.user);
      } else {
        // Обработка специфичных ошибок от сервера
        const errorMessage = data.message || 'Ошибка при авторизации';
        
        if (errorMessage.toLowerCase().includes('пароль') || 
            errorMessage.toLowerCase().includes('password') ||
            errorMessage.toLowerCase().includes('неверный') ||
            errorMessage.toLowerCase().includes('неправильный')) {
          setLoginErrors(prev => ({
            ...prev,
            password: 'Неправильный пароль'
          }));
        } else if (errorMessage.toLowerCase().includes('пользователь') ||
                   errorMessage.toLowerCase().includes('user') ||
                   errorMessage.toLowerCase().includes('не найден') ||
                   errorMessage.toLowerCase().includes('not found')) {
          setLoginErrors(prev => ({
            ...prev,
            email: 'Пользователя с такой почтой нет'
          }));
        } else {
          setError(errorMessage);
        }
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
      console.error('Ошибка авторизации:', err);
    } finally {
      setLoading(false);
    }
  };

  // Валидация формы регистрации
  const validateRegister = () => {
    const errors = {};
    let isValid = true;

    // Валидация email
    if (!registerData.email.trim()) {
      errors.email = 'Email обязателен для заполнения';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      errors.email = 'Некорректный формат email';
      isValid = false;
    }

    // Валидация пароля
    if (!registerData.password) {
      errors.password = 'Пароль обязателен для заполнения';
      isValid = false;
    } else if (registerData.password.length < 6) {
      errors.password = 'Пароль должен содержать минимум 6 символов';
      isValid = false;
    } else if (registerData.password.length > 50) {
      errors.password = 'Пароль не должен превышать 50 символов';
      isValid = false;
    }

    // Валидация имени
    if (!registerData.name.trim()) {
      errors.name = 'Имя обязательно для заполнения';
      isValid = false;
    } else if (registerData.name.trim().length > 50) {
      errors.name = 'Имя не должно превышать 50 символов';
      isValid = false;
    } else if (/[0-9]/.test(registerData.name)) {
      errors.name = 'Имя не должно содержать цифры';
      isValid = false;
    }

    // Валидация фамилии
    if (!registerData.lastname.trim()) {
      errors.lastname = 'Фамилия обязательна для заполнения';
      isValid = false;
    } else if (registerData.lastname.trim().length > 50) {
      errors.lastname = 'Фамилия не должна превышать 50 символов';
      isValid = false;
    } else if (/[0-9]/.test(registerData.lastname)) {
      errors.lastname = 'Фамилия не должна содержать цифры';
      isValid = false;
    }

    // Валидация возраста
    if (registerData.age) {
      const ageStr = registerData.age.toString().trim();
      const age = parseInt(ageStr, 10);
      // Проверка что это целое число (нет десятичной части)
      const hasDecimalPart = ageStr.includes('.') || ageStr.includes(',');
      // Проверка что строка соответствует целому числу
      const isInteger = /^\d+$/.test(ageStr);
      
      if (!isInteger || isNaN(age) || age < 0 || age > 120 || hasDecimalPart) {
        errors.age = 'Возраст должен быть положительным целым числом не более 120';
        isValid = false;
      }
    }

    setRegisterErrors(errors);
    return isValid;
  };

  // Отправка формы регистрации
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setRegisterErrors({ email: '', password: '', name: '', lastname: '', age: '' });

    // Валидация на клиенте
    if (!validateRegister()) {
      setLoading(false);
      return;
    }

    // Подготовка данных для отправки
    const dataToSend = {
      email: registerData.email.trim(),
      password: registerData.password,
      name: registerData.name.trim(),
      lastname: registerData.lastname.trim()
    };

    // Добавление опциональных полей, если они заполнены
    if (registerData.age) {
      dataToSend.age = parseInt(registerData.age);
    }

    try {
      const data = await authService.register(dataToSend);

      if (data.success) {
        authService.saveAuthData(data.data);
        setSuccess('Регистрация успешна!');
        console.log('Пользователь зарегистрирован:', data.data.user);
      } else {
        // Обработка ошибок от сервера (например, email уже существует)
        const errorMessage = data.message || 'Ошибка при регистрации';
        
        if (errorMessage.toLowerCase().includes('email') || 
            errorMessage.toLowerCase().includes('почт')) {
          setRegisterErrors(prev => ({
            ...prev,
            email: errorMessage
          }));
        } else {
          setError(errorMessage);
        }
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
      console.error('Ошибка регистрации:', err);
    } finally {
      setLoading(false);
    }
  };

  // Переключение между формами
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setLoginErrors({ email: '', password: '' });
    setRegisterErrors({ email: '', password: '', name: '', lastname: '', age: '' });
  };

  return {
    // Состояние
    isLogin,
    loading,
    error,
    success,
    loginData,
    registerData,
    loginErrors,
    registerErrors,
    
    // Обработчики
    handleLoginChange,
    handleRegisterChange,
    handleLogin,
    handleRegister,
    toggleForm
  };
};
