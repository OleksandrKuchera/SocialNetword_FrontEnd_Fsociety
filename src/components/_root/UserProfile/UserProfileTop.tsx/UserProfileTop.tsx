import { CalendarMonthOutlined, LocationOnOutlined, Message } from '@mui/icons-material';
import style from '../../MyProfile/MyProfileTop/style.module.scss';
import { Divider } from '@mui/material';
import { userDataType } from '../UserProfile';
import { useContext, useEffect, useState } from 'react';
import { User } from '../../FriendList/FriendList';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { MyProfileContext } from '../../HomeLayout/HomeLayout';

type UserProfileTopProps = {
    userData: userDataType;
}

const UserProfileTop: React.FC<UserProfileTopProps> = ({ userData }) => {

    const [userDataState] = useState<User>(userData);
    const [isFollow, setIsFollow] = useState<boolean>(false);
    const [myFriendList, setMyFriendList] = useState<userDataType[]>([]);
    const navigate = useNavigate();    
    const myProfile = useContext(MyProfileContext);


    useEffect(() => {
        const getMyFriendList = async () => {
            try {
                const response = await axios.get(`https://socialnetword-fsociety.onrender.com/friend/followers/${myProfile?.name}`);
                setMyFriendList(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getMyFriendList();
    }, [myProfile?.name]);

    useEffect(() => {
        if (myFriendList.length !== 0) {
            setIsFollow(myFriendList.some(friend => friend.name === userDataState.name));

        }
    }, [myFriendList, userDataState.name]);


    const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        try {
            await axios.post('https://socialnetword-fsociety.onrender.com/friend/add/', {
                friend_name: userData.name,
                user_name: myProfile?.name,
            });
            setIsFollow(true);
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    }
    const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        try {
            await axios.delete(`https://socialnetword-fsociety.onrender.com/friend/remove/`, {
                data: {
                    friend_name: userData.name,
                    user_name: myProfile?.name
                }
            });

            setIsFollow(false);
        } catch (error) {
            console.error('Помилка при видаленні друга:', error);
        }
    };
    const handleClickMessage = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); 
        e.preventDefault();
        try{
            if(myProfile) {
                const dataForm = new FormData();
                dataForm.append('sender_name', myProfile.name);
                dataForm.append('receiver_name', userData.name);
                await axios.post('https://socialnetword-fsociety.onrender.com/chat/create_chat_room/', dataForm);
            }
        } catch(e) {
            console.log(e);
        } finally {
            navigate('/message/');
        }
    };



    return (
        <div className={style.profile__container}>
            {userData && (
                <>
                    <div className="row">
                        <div className="col-12"></div>
                        <div className="col-2">
                            {userData.avatar && userData.avatar.length >= 13 && (
                                <div className={style.avatar__container}>
                                    <img className={style.avatar} src={userData.avatar.slice(13)} alt="avatar" />
                                </div>
                            )}
                        </div>
                        <div className="col-10 d-flex flex-column justify-content-around">
                            <div className={style.follow__btn}>
                                <div className="row d-flex justify-content-between">
                                    <div className="col-4">
                                        <h2 className={style.user__name}>{userData.name}</h2>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end">
                                        <button onClick={handleClickMessage}><Message /></button>
                                        {userDataState.name !== myProfile?.name ? isFollow ? <button className={style.unfollow__btn} onClick={handleClickDelete}>Unfollow</button> : <button onClick={handleFollow}>Follow</button> : null}                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 d-flex justify-content-between">
                                    <p className={style.profile__count}><span>{userData.post_count || 0}</span>Posts</p>
                                    <NavLink to={`/${userData.name}/friends`} className={style.profile__count}><span>{userData.friends_count || 0}</span>Friends</NavLink>
                                    <NavLink to={`/${userData.name}/followers`} className={style.profile__count}><span>{userData.subscribers_count || 0}</span>Followers</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className={style.profile__count__container}>
                                <div className="row">
                                    <div className="col-3">
                                        <p className={style.profile__count}><LocationOnOutlined />{userData.located}</p>
                                    </div>
                                    <div className="col-3">
                                        <p className={style.profile__count}><CalendarMonthOutlined />{userData.birth_date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Divider />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className={style.profile__description}>
                                <p> {userData.bio}</p>
                            </div>
                        </div>
                    </div>
                    <Divider className={style.divider} />
                </>
            )
            }
        </div >
    );
}

export default UserProfileTop;
