import { useState } from 'react';
// import axios from 'axios';
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
    const [userData] = useState<User>(user);
    const userName = userData.name;

    const handleClickCard = () => {
        navigate(`/profile/${userName}`);
    }

    const [isFollow, setIsFollow] = useState<boolean>(false);
    const [myFriendList, setMyFriendList] = useState<userDataType[]>([]);


    return (
        <div className="col-12">
            <div className={style.friend__item__container} onClick={handleClickCard}>
                <div className={style.friend__info}>
                    <img src={avatar} alt="avatar" />
                    <h3>{userData.name}</h3>
                </div>
            </div>
        </div>
    );
}

export default PeopleItem;
