import { useEffect, useState } from 'react';
import RecomendationItem from '../RecomendationItem/RecomendationItem';
import style from './style.module.scss';
import axios from 'axios';
import { User } from '../../FriendList/FriendList';
import { useNavigate } from 'react-router-dom';
import { userDataType } from '../../HomeLayout/HomeLayout';
import { CircularProgress } from '@mui/material';

type RecomendationListProps = {
    myProfile: userDataType
}

const RecomendationList = ({ myProfile }: RecomendationListProps) => {
    const [loading, setLoading] = useState<boolean>(true); // Додали стейт для відстеження статусу завантаження
    const [recomendationList, setRecomendationList] = useState<User[]>([]);
    const [myFriendList, setMyFriendList] = useState<userDataType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const handleData = async () => {
            try {
                const responseMyFriends = await axios.get(`https://socialnetword-fsociety.onrender.com/friend/followers/${myProfile.name}`);
                setMyFriendList(responseMyFriends.data);
                const responseAllFriends = await axios.get('https://socialnetword-fsociety.onrender.com/friend/users');
                const myFriends = responseMyFriends.data.map((friend: User) => friend.name);
                const allUsers = responseAllFriends.data;

                // Фільтруємо користувачів, які не є друзями
                const nonFriends = allUsers.filter((user: User) => !myFriends.includes(user.name) && user.name !== myProfile.name);

                setRecomendationList(nonFriends);
                setLoading(false); // Після завантаження даних встановлюємо loading в false
            } catch (e) {
                console.log(e)
            }
        };
        handleData();
    }, [myProfile.name])

    const handleClickCard = (userName: string) => {
        navigate(`/profile/${userName}`);
    };

    return (
        <div className={style.recomendation__list}>
            <div className="row">
                <div className="col-12">
                    <h2 className={style.recomendation__title}>Recomendation List</h2>
                </div>
            </div>
            {loading ?
                <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <CircularProgress color="success" />
                    </div>
                </div> :
                <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className={style.recomendation__list__container}>
                            {recomendationList.map((user, index) => (
                                user.name.length > 1 ?
                                <RecomendationItem frendList={myFriendList} myName={myProfile.name} handleClickCard={handleClickCard} key={index} user={user} />
                                : null
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}


export default RecomendationList;