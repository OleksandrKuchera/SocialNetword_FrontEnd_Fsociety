import { useEffect, useState } from 'react';
import avatar from '../../../assets/avatar.png'
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type userDataType = {
    name: string,
    avatar: string,
    isFollow: boolean,
}

const PeopleItem = (user: userDataType) => {

    const handdleFollowing = () => {
    }
    
    const [userData, setUserData] = useState<userDataType>(user);
    const navigate = useNavigate();
    const userId = user.name; 

    const handleClickCard = () => {
        navigate(`/profile/${userId}`);
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken'); // Отримуємо accessToken з localStorage
                if (!accessToken) {
                    console.error('Access token not found in localStorage');
                    return;
                }

                const response = await axios.get(`http://127.0.0.1:8000/api/usersList/name${accessToken}`);

                setUserData(response.data);
                console.log('Отримана інформація:', response.data);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="col-12">
            <div className={style.friend__item__container}  onClick={handleClickCard}>
                <div className={style.friend__info}>
                    <img src={avatar} alt="avatar" />
                    <h3>{userData.name}</h3>
                </div>
                <div className={style.friend__btn}>
                    <button className={style.friend__btn__folow} onClick={handdleFollowing}>Folowwing</button>
                </div>
            </div>
        </div >
     );
}

export default PeopleItem;