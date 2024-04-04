import { CalendarMonthOutlined, LocationOnOutlined, Message } from '@mui/icons-material';
import avatar from '../../../../assets/avatar.png';
import style from '../../MyProfile/MyProfileTop/style.module.scss';
import { Divider } from '@mui/material';
import { userDataType } from '../UserProfile';
import { useState } from 'react';
import { User } from '../../FriendList/FriendList';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

type UserProfileTopProps = {
    userData: userDataType;
}

const UserProfileTop: React.FC<UserProfileTopProps> = ({ userData }) => {

    const [userDataState, setUserDataState] = useState<User>(userData); 

    const handleFollow = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found in localStorage');
                return;
            }

            const responseUser = await axios.get(`http://127.0.0.1:8000/api/mypage/${accessToken}`);
            const userName = responseUser.data.name;

            await axios.post('http://127.0.0.1:8000/friend/add/', {
                friend_name: userData.name,
                user_name: userName,
            });

            setUserDataState({ ...userDataState, isFollow: !userDataState.isFollow });
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    }

    return (
        <div className={style.profile__container}>
            {userData && (
                <>
                    <div className="row">
                        <div className="col-12"></div>
                        <div className="col-2">
                            <img className={style.avatar} src={avatar} alt="avatar" />
                        </div>
                        <div className="col-10 d-flex flex-column justify-content-around">
                            <div className={style.follow__btn}>
                                <div className="row d-flex justify-content-between">
                                    <div className="col-4">
                                        <h2>{userData.name}</h2>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end">
                                        <button><Message /></button>
                                        {userData.isFollow ? <button onClick={handleFollow}>Unfollow</button> : <button onClick={handleFollow} className={style.unfollow__btn}>Follow</button>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 d-flex justify-content-between">
                                    <p className={style.profile__count}><span>{userData.postCount}</span>Posts</p>
                                    <NavLink to={`${userData.name}/:friend`} className={style.profile__count}><span>{userData.friends_count}</span>Friends</NavLink>
                                    <NavLink to={`${userData.name}/:followers`} className={style.profile__count}><span>{userData.followersCount}</span>Followers</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className={style.profile__count__container}>
                                <div className="row">
                                    <div className="col-3">
                                        <a className={style.profile__count} href=""><LocationOnOutlined />{userData.located}</a>
                                    </div>
                                    <div className="col-3">
                                        <a className={style.profile__count} href=""><CalendarMonthOutlined />{userData.birth_date}</a>
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
                            <p>{userData.bio}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserProfileTop;
