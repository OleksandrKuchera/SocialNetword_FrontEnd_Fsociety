import { useState } from 'react';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { Delete, Message } from '@mui/icons-material';
import axios from 'axios';

type User = {
    name: string;
    avatar: string;
    isFollow: boolean;
};

type Props = {
    user: User;
};

const FriendItem = ({ user }: Props) => {
    const navigate = useNavigate();
    const [userData] = useState<User>(user);
    const userName = userData.name;

    const handleClickCard = () => {
        navigate(`/profile/${userName}`);
    }

    const handleClickMessage = () => {
        // Додайте логіку для відправлення повідомлення користувачеві
    }

    const handleClickDelete = () => {
        // Виконати запит на видалення користувача
        axios.delete(`http://127.0.0.1:8000/friend/remove/`, { data: { friend_name: userName, user_name: 'current_user_name' } })
            .then(response => {
                console.log(response.data);
                // Оновіть стан або виконайте інші дії, які потрібно виконати після успішного видалення користувача
            })
            .catch(error => {
                console.error('Error deleting friend:', error);
                // Обробка помилки при видаленні користувача
            });
    }

    return (
        <div key={userData.name} className="col-12">
            <div onClick={handleClickCard} className={style.friend__item__container}>
                <div className={style.friend__info}>
                    <img src={userData.avatar} alt="avatar" />
                    <h3>{userData.name}</h3>
                </div>
                <div className={style.friend__btn}>
                    <button onClick={handleClickMessage}><Message /></button>
                    <button onClick={handleClickDelete}><Delete /></button>
                </div>
            </div>
        </div>
    );
}

export default FriendItem;
