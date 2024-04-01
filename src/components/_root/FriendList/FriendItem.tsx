import { Delete, Message } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import style from './style.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

type userDataType = {
    name: string,
    avatar: string,
    isFollow: boolean,
}

const FriendItem = (name : string) => {
    const [userData, setUserData] = useState<userDataType>({
        name: '',
        avatar: '',
        isFollow: false,
    });
    const navigate = useNavigate();
    const userId = name; 

    const handleClickCard = () => {
        navigate(`/profile/${userId}`);
    }

    const handdleClickMessage = () => {
    }
    const handdleClickDelete = () => {     
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
        <div key={userId} className="col-12">
            <div onClick={handleClickCard} className={style.friend__item__container}>
                <div className={style.friend__info}>
                    <img src={userData.avatar} alt="avatar" />
                    <h3>{userData.name}</h3>
                </div>
                <div className={style.friend__btn}>
                    <button onClick={handdleClickMessage}><Message/></button>
                    <button onClick={handdleClickDelete}><Delete/></button>
                </div>
            </div>
        </div >
     );
}

export default FriendItem;