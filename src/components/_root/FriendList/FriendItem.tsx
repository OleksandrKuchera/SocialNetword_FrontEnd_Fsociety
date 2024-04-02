import {  useState } from 'react';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { Delete, Message } from '@mui/icons-material';

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

    }
    const handleClickDelete = () => {

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