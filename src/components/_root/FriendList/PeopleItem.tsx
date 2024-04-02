import {  useState } from 'react';
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
    const [userData] = useState<User>(user); // Initialize state with the user object passed as props
    const userName = userData.name;

    const handleClickCard = () => {
        navigate(`/profile/${userName}`);
    }
    const handleFollow = () => {
        userData.isFollow = !userData.isFollow;
    }

    return (
        <div className="col-12">
            <div className={style.friend__item__container}  onClick={handleClickCard}>
                <div className={style.friend__info}>
                    <img src={avatar} alt="avatar" />
                    <h3>{userData.name}</h3>
                </div>
                <div className={style.friend__btn}>
                    <button onClick={handleFollow} className={style.friend__btn__folow}>Following</button>
                </div>
            </div>
        </div >
     );
}

export default PeopleItem;