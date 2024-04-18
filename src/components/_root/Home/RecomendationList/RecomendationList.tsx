import { useEffect, useState } from 'react';
import RecomendationItem from '../RecomendationItem/RecomendationItem';
import style from './style.module.scss';
import axios from 'axios';
import { User } from '../../FriendList/FriendList';
import { useNavigate } from 'react-router-dom';


const RecomendationList = () => {
    const [recomendationList, setRecomendationList] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const handleData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken'); // Отримуємо accessToken з localStorage
                if (!accessToken) {
                    console.error('Access token not found in localStorage');
                    return;
                }
        
                const responseMyProfile = await axios.get(`http://127.0.0.1:8000/api/mypage/${accessToken}`);
                const responseMyFriends = await axios.get(`http://127.0.0.1:8000/friend/followers/${responseMyProfile.data.name}`);
                const responseAllFriends = await axios.get('http://127.0.0.1:8000/friend/users');
        
                const myFriends = responseMyFriends.data.map((friend : User) => friend.name);
                const allUsers = responseAllFriends.data;
        
                // Фільтруємо користувачів, які не є друзями
                const nonFriends = allUsers.filter((user: User) => !myFriends.includes(user.name) && user.name !== responseMyProfile.data.name);
        
                setRecomendationList(nonFriends);
            } catch (e) {
                console.log(e)
            }
        };
        handleData();
    }, [])

    const handleClickCard = (userName : string) => {
        navigate(`/profile/${userName}`);
    };

    return (
        <div className={style.recomendation__list}>
            <div className="row">
                <div className="col-12">
                    <h2 className={style.recomendation__title}>Recomendation List</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className={style.recomendation__list__container}>
                        {recomendationList.map((user, index) => (
                            <RecomendationItem handleClickCard={handleClickCard} key={index} user={user} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecomendationList;