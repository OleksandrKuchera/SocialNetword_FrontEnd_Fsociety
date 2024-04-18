import style from './style.module.scss';
import { User } from '../../FriendList/FriendList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { userDataType } from '../../UserProfile/UserProfile';

type RecomendationItemType = {
    user: User,
    handleClickCard: (name : string) => void,
}

const RecomendationItem = ({user, handleClickCard} : RecomendationItemType) => {
    const [isFollow, setIsFollow] = useState<boolean>(false);
    const [myFriendList, setMyFriendList] = useState<userDataType[]>([]);
    const [myProfileName, setMyProfileName] = useState<string>('');

    useEffect(() => {
        const getMyFriendList = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.error('Access token not found in localStorage');
                    return;
                }
    
                const responseUser = await axios.get(`http://127.0.0.1:8000/api/mypage/${accessToken}`);
                const response = await axios.get(`http://127.0.0.1:8000/friend/followers/${responseUser.data.name}`);
                setMyProfileName(responseUser.data.name);
                setMyFriendList(response.data);
                console.log(responseUser.data.name, response.data)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        getMyFriendList();
    }, []); 
    
    useEffect(() => {
        if (myFriendList.length !== 0) {
            setIsFollow(myFriendList.some(friend => friend.name === user.name));
        }
    }, [myFriendList, user.name]);

    const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Stop event propagation
        e.preventDefault();
        
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found in localStorage');
                return;
            }

            await axios.post('http://127.0.0.1:8000/friend/add/', {
                friend_name: user.name,
                user_name: myProfileName, // Assuming you want to use the user's own name as user_name
            });
            setIsFollow(true);
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };

    const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Stop event propagation
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found in localStorage');
                return;
            }

            await axios.delete('http://127.0.0.1:8000/friend/remove/', {
                data: {
                    friend_name: user.name,
                    user_name: myProfileName, // Assuming you want to use the user's own name as user_name
                }
            });
            setIsFollow(false); // Assuming unfollowing is successful
        } catch (error) {
            console.error('Error removing friend:', error);
        }
    };

    return (
        <div className="row">
            <div className="col-12">
                <div onClick={() => handleClickCard(user.name)} className={style.recomendation__item}>
                    <div className='d-flex align-items-center'>
                        <img src={user.avatar.slice(13)} alt="avatar" />
                        <h3>{user.name}</h3>
                    </div>
                    {isFollow ? <button className={style.friend__btn__unfolow} onClick={handleClickDelete}>Unfollow</button> : <button className={style.friend__btn__folow} onClick={handleFollow}>Follow</button>}
                </div>
            </div>
        </div>
    );
}

export default RecomendationItem;