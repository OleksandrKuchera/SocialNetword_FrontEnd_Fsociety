import { useState } from 'react';
import axios from 'axios';
import avatar from '../../../assets/avatar.png';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';

type User = {
    name: string;
    avatar: string;
    isFollow: boolean;
};

type Props = {
    user: User;
};

const PeopleItem = ({ user }: Props) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<User>(user); 
    const userName = userData.name;

    const handleClickCard = () => {
        navigate(`/profile/${userName}`);
    }

    const handleFollow = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found in localStorage');
                return;
            }
    
            // Отримання інформації про користувача зі змінним accessToken
            const responseUser = await axios.get(`http://127.0.0.1:8000/api/mypage/${accessToken}`);
            const userName = responseUser.data.name; // Отримуємо ім'я користувача з отриманої відповіді
    
            // Відправлення запиту на додавання друга з ім'ям користувача та ім'ям друга
            const response = await axios.post('http://127.0.0.1:8000/friend/add/', {
                friend_name: user.name, // Використовуємо ім'я користувача, переданого як props
                user_name: userName, // Використовуємо ім'я користувача, отримане з accessToken
            });
    
            // Оновлення стану користувача, який показує, чи відстежує користувач даного друга
            setUserData({ ...userData, isFollow: !userData.isFollow });
        } catch (error) {
            console.error('Помилка при додаванні друга:', error);
        }
    }
    

    return (
        <div className="col-12">
            <div className={style.friend__item__container} onClick={handleClickCard}>
                <div className={style.friend__info}>
                    <img src={avatar} alt="avatar" />
                    <h3>{userData.name}</h3>
                </div>
                <div className={style.friend__btn}>
                    <button onClick={handleFollow} className={style.friend__btn__folow}>
                        {userData.isFollow ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PeopleItem;
