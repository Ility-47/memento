import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './profile.module.scss';

/**
 * Компонент личного кабинета пользователя
 */
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Получаем данные пользователя из localStorage
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      // Если нет данных пользователя, перенаправляем на страницу авторизации
      navigate('/auth');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('Ошибка при загрузке данных пользователя:', error);
      navigate('/auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  if (!user) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileWrapper}>
        <div className={styles.profileHeader}>
          <h1>Личный кабинет</h1>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Выйти
          </button>
        </div>

        <div className={styles.profileContent}>
          <div className={styles.profileCard}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>
                {user.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <h2>{user.name} {user.lastname}</h2>
              <p className={styles.email}>{user.email}</p>
            </div>

            <div className={styles.infoSection}>
              <h3>Личная информация</h3>
              
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Имя:</span>
                  <span className={styles.value}>{user.name || 'Не указано'}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.label}>Фамилия:</span>
                  <span className={styles.value}>{user.lastname || 'Не указано'}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.label}>Email:</span>
                  <span className={styles.value}>{user.email || 'Не указано'}</span>
                </div>

                {user.age && (
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Возраст:</span>
                    <span className={styles.value}>{user.age} лет</span>
                  </div>
                )}

                <div className={styles.infoItem}>
                  <span className={styles.label}>ID пользователя:</span>
                  <span className={styles.value}>{user._id || user.id || 'Не указано'}</span>
                </div>
              </div>
            </div>

            <div className={styles.actionsSection}>
              <h3>Действия</h3>
              <div className={styles.actionsGrid}>
                <button className={styles.actionButton}>
                  Редактировать профиль
                </button>
                <button className={styles.actionButton}>
                  Изменить пароль
                </button>
                <button className={styles.actionButton}>
                  Настройки подписки
                </button>
                <button className={styles.actionButton}>
                  История активности
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
