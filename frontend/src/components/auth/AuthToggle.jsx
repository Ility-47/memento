import styles from './auth.module.scss';

/**
 * Компонент для переключения между формами авторизации и регистрации
 */
const AuthToggle = ({ isLogin, onToggle }) => {
  return (
    <div className={`${styles.authToggle} ${!isLogin ? styles.registerMode : ''}`}>
      <button 
        onClick={() => !isLogin && onToggle()}
        className={isLogin ? styles.active : ''}
      >
        Авторизация
      </button>
      <button 
        onClick={() => isLogin && onToggle()}
        className={!isLogin ? styles.active : ''}
      >
        Регистрация
      </button>
    </div>
  );
};

export default AuthToggle;
