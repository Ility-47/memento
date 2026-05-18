import styles from './auth.module.scss';

/**
 * Компонент формы регистрации
 */
const RegisterForm = ({ 
  registerData, 
  registerErrors = { email: '', password: '', name: '', lastname: '', age: '' },
  loading, 
  onChange, 
  onSubmit 
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Регистрация</h2>
      
      <div className={styles.fieldGroup}>
        <label htmlFor="register-email">Email</label>
        <input
          type="email"
          id="register-email"
          name="email"
          value={registerData.email || ''}
          onChange={onChange}
          placeholder="Введите ваш email"
          className={registerErrors?.email ? styles.inputError : ''}
          required
        />
        {registerErrors?.email && registerErrors.email.trim() && (
          <span className={styles.fieldError}>{registerErrors.email}</span>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="register-password">Пароль</label>
        <input
          type="password"
          id="register-password"
          name="password"
          value={registerData.password || ''}
          onChange={onChange}
          placeholder="Минимум 6 символов"
          className={registerErrors?.password ? styles.inputError : ''}
          required
          minLength={6}
        />
        {registerErrors?.password && registerErrors.password.trim() && (
          <span className={styles.fieldError}>{registerErrors.password}</span>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="register-name">Имя</label>
        <input
          type="text"
          id="register-name"
          name="name"
          value={registerData.name || ''}
          onChange={onChange}
          placeholder="Введите ваше имя"
          className={registerErrors?.name ? styles.inputError : ''}
          required
          maxLength={50}
          pattern="[А-Яа-яA-Za-z\s\-']+"
        />
        {registerErrors?.name && registerErrors.name.trim() && (
          <span className={styles.fieldError}>{registerErrors.name}</span>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="register-lastname">Фамилия</label>
        <input
          type="text"
          id="register-lastname"
          name="lastname"
          value={registerData.lastname || ''}
          onChange={onChange}
          placeholder="Введите вашу фамилию"
          className={registerErrors?.lastname ? styles.inputError : ''}
          required
          maxLength={50}
          pattern="[А-Яа-яA-Za-z\s\-']+"
        />
        {registerErrors?.lastname && registerErrors.lastname.trim() && (
          <span className={styles.fieldError}>{registerErrors.lastname}</span>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="register-age">Возраст</label>
        <input
          type="number"
          id="register-age"
          name="age"
          value={registerData.age || ''}
          onChange={onChange}
          placeholder="Введите ваш возраст"
          className={registerErrors?.age ? styles.inputError : ''}
          min="0"
          max="120"
          step="1"
        />
        {registerErrors?.age && registerErrors.age.trim() && (
          <span className={styles.fieldError}>{registerErrors.age}</span>
        )}
      </div>

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
};

export default RegisterForm;
