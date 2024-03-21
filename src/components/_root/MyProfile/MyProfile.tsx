import { useState, useEffect } from 'react';
import axios from 'axios';

interface UserInfo {
  name: string;
  email: string;
  avatar: string | null;
  // Додайте інші властивості, якщо потрібно
}

function UserProfile() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Функція, яка виконує GET-запит на сервер для отримання інформації про користувача
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get<UserInfo>('http://127.0.0.1:8000/profile/<int:user_id>/');
        setUserInfo(response.data); // Встановлюємо отриману інформацію в стан
        setLoading(false); // Змінюємо стан загрузки на false
      } catch (error) {
        console.error('Error fetching user info:', error);
        setLoading(false); // Якщо виникає помилка, також змінюємо стан загрузки на false
      }
    };

    fetchUserInfo(); // Викликаємо функцію отримання інформації про користувача при монтуванні компонента
  }, []); // Порожній масив позначає, що ефект викликається лише після першого рендеру компонента

  // Повертаємо розмітку компонента
  return (
    <div>
      <h1>User Profile</h1>
      {loading ? (
        <p>Loading...</p> // Виводимо повідомлення про загрузку, якщо дані ще не отримані
      ) : (
        // Виводимо інформацію про користувача, якщо дані успішно отримані
        <div>
          <p>Username: {userInfo?.username}</p>
          <p>Email: {userInfo?.email}</p>
          {userInfo?.avatar && <p>Avatar: <img src={userInfo.avatar} alt="Avatar" /></p>}
          {/* Додайте інші дані профілю, якщо потрібно */}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
