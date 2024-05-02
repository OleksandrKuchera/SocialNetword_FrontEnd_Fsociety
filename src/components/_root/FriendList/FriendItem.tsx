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
    myProfile: userDataType,
    myFriendList: userDataType[],
};

const FriendItem = ({ user, myProfile, myFriendList }: Props) => {
    const navigate = useNavigate();
    const [isFollow, setIsFollow] = useState<boolean>(false);


    const handleClickCard = () => {
        navigate(`/profile/${user.name}`);
    };

    useEffect(() => {

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

            await axios.post('https://socialnetword-fsociety.onrender.com/friend/add/', {
                friend_name: user.name,
                user_name: myProfile.name, // Assuming you want to use the user's own name as user_name
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
            await axios.delete('https://socialnetword-fsociety.onrender.com/friend/remove/', {
                data: {
                    friend_name: user.name,
                    user_name: myProfile.name, // Assuming you want to use the user's own name as user_name
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
            dataForm.append('sender_name', myProfile.name);
            dataForm.append('receiver_name', user.name);
            await axios.post('https://socialnetword-fsociety.onrender.com/chat/create_chat_room/', dataForm);
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
                    {user.name !== myProfile.name ? isFollow ? <button className={style.friend__btn__unfolow} onClick={handleClickDelete}>Unfollow</button> : <button className={style.friend__btn__folow} onClick={handleFollow}>Follow</button> : null}
                </div>
            </div>
        </div>
    );
};

export default FriendItem;
