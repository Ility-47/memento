import styles from './auth.module.scss';

/**
 * Компонент формы авторизации
 */
const LoginForm = ({ 
  loginData,
  loginErrors = { email: '', password: '' },
  loading, 
  onChange, 
  onSubmit 
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Авторизация</h2>
      
      <div className={styles.fieldGroup}>
        <label htmlFor="login-email">Email</label>
        <input
          type="email"
          id="login-email"
          name="email"
          value={loginData.email}
          onChange={onChange}
          placeholder="Введите ваш email"
          className={loginErrors?.email ? styles.inputError : ''}
          required
        />
        {loginErrors?.email && (
          <span className={styles.fieldError}>{loginErrors.email}</span>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="login-password">Пароль</label>
        <input
          type="password"
          id="login-password"
          name="password"
          value={loginData.password}
          onChange={onChange}
          placeholder="Введите пароль"
          className={loginErrors?.password ? styles.inputError : ''}
          required
        />
        {loginErrors?.password && (
          <span className={styles.fieldError}>{loginErrors.password}</span>
        )}
      </div>

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
};

export default LoginForm;
