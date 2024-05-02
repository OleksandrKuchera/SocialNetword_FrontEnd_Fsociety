import style from './style.module.scss';
import { User } from '../../FriendList/FriendList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { userDataType } from '../../UserProfile/UserProfile';
import { shortenText } from '../../functions/shortText';

type RecomendationItemType = {
    myName: string
    user: User,
    handleClickCard: (name : string) => void,
    frendList: userDataType[];
}

const RecomendationItem = ({myName,user, handleClickCard, frendList} : RecomendationItemType) => {
    const [isFollow, setIsFollow] = useState<boolean>(false);
    
    useEffect(() => {
        if (frendList.length !== 0) {
            setIsFollow(frendList.some(friend => friend.name === user.name));
        }
    }, [frendList, user.name]);

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
                user_name: myName, // Assuming you want to use the user's own name as user_name
            });
            setIsFollow(true);
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };

    const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found in localStorage');
                return;
            }

            await axios.delete('https://socialnetword-fsociety.onrender.com/friend/remove/', {
                data: {
                    friend_name: user.name,
                    user_name: myName, // Assuming you want to use the user's own name as user_name
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
                        <h3>{shortenText(user.name, 11)}</h3>
                    </div>
                    {isFollow ? <button className={style.friend__btn__unfolow} onClick={handleClickDelete}>Unfollow</button> : <button className={style.friend__btn__folow} onClick={handleFollow}>Follow</button>}
                </div>
            </div>
        </div>
    );
}

export default RecomendationItem;