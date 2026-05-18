import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import AuthToggle from './AuthToggle';
import AuthMessage from './AuthMessage';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import styles from './auth.module.scss';

/**
 * Основной компонент авторизации
 * Объединяет все подкомпоненты и логику авторизации
 */
const Auth = () => {
  const navigate = useNavigate();
  const {
    isLogin,
    loading,
    error,
    success,
    loginData,
    registerData,
    loginErrors,
    registerErrors,
    handleLoginChange,
    handleRegisterChange,
    handleLogin,
    handleRegister,
    toggleForm
  } = useAuth();

  const [displayForm, setDisplayForm] = useState(isLogin);
  const [isAnimating, setIsAnimating] = useState(false);

  // Проверка авторизации при загрузке компонента
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/profile', { replace: true });
    }
  }, [navigate]);

  // Редирект при успешной авторизации или регистрации
  useEffect(() => {
    if (success) {
      // Немедленный редирект на страницу профиля после успешной авторизации
      navigate('/profile', { replace: true });
    }
  }, [success, navigate]);

  useEffect(() => {
    if (displayForm !== isLogin) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayForm(isLogin);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLogin, displayForm]);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authWrapper}>
        <AuthToggle isLogin={isLogin} onToggle={toggleForm} />
        
        <AuthMessage error={error} success={success} />

        <div className={styles.formContainer}>
          <div className={`${styles.form} ${isAnimating ? styles.formExit : styles.formEnter}`}>
            {displayForm ? (
              <LoginForm
                loginData={loginData}
                loginErrors={loginErrors}
                loading={loading}
                onChange={handleLoginChange}
                onSubmit={handleLogin}
              />
            ) : (
              <RegisterForm
                registerData={registerData}
                registerErrors={registerErrors}
                loading={loading}
                onChange={handleRegisterChange}
                onSubmit={handleRegister}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
