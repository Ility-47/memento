import styles from './auth.module.scss';

/**
 * Компонент для отображения сообщений об ошибках и успехе
 */
const AuthMessage = ({ error, success }) => {
  if (!error && !success) {
    return null;
  }

  return (
    <div className={styles.authMessage}>
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className={styles.success}>
          <p>{success}</p>
        </div>
      )}
    </div>
  );
};

export default AuthMessage;
