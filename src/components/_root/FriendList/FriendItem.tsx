import { useEffect, useState } from 'react';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { Message } from '@mui/icons-material';
import axios from 'axios';
import { userDataType } from '../UserProfile/UserProfile';

type User = {
    name: string;
    avatar: string;

};

type Props = {
    user: User;
};

const FriendItem = ({ user }: Props) => {
    const navigate = useNavigate();
    const [isFollow, setIsFollow] = useState<boolean>(false);
    const [myFriendList, setMyFriendList] = useState<userDataType[]>([]);
    const [myProfileName, setMyProfileName] = useState<string>('');


    const handleClickCard = () => {
        navigate(`/profile/${user.name}`);
    };

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

    const handleClickMessage = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); 
        e.preventDefault();
        try{
            const dataForm = new FormData();
            dataForm.append('sender_name', myProfileName);
            dataForm.append('receiver_name', user.name);
            await axios.post('http://127.0.0.1:8000/chat/create_chat_room/', dataForm);
        } catch(e) {
            console.log(e);
        } finally {
            navigate('message/');
        }
    };

    return (
        <div key={user.name} className="col-12">
            <div onClick={handleClickCard} className={style.friend__item__container}>
                <div className={style.friend__info}>
                    <img src={user.avatar.slice(13)} alt="avatar" />
                    <h3>{user.name}</h3>
                </div>
                <div className={style.friend__btn}>
                    <button onClick={handleClickMessage}><Message /></button>
                    {user.name !== myProfileName ? isFollow ? <button className={style.friend__btn__unfolow} onClick={handleClickDelete}>Unfollow</button> : <button className={style.friend__btn__folow} onClick={handleFollow}>Follow</button> : null}
                </div>
            </div>
        </div>
    );
};

export default FriendItem;
