import React, { useState, useEffect } from 'react';
import MyProfilePost from '../MyProfilePost/MyProfilePost';
import style from './style.module.scss';
import axios from 'axios';
import { userDataType } from '../../UserProfile/UserProfile';

type Post = {
    author: string;
    image: string;
    description: string;
    likes: number;
};

type MyProfileDescProps = {
    userData: userDataType;
};

const MyProfileDesc: React.FC<MyProfileDescProps> = ({ userData }) => {
    const [userPosts, setUserPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get<Post[]>(`http://127.0.0.1:8000/posts/lookPostUser/${userData.name}`);
                setUserPosts(response.data);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        fetchUserPosts();
    }, [userData.name]);

    return (
        <div className={style.desc__container}>
            <div className="row">
                {userPosts.length > 0 ? (
                    userPosts.map((post, index) => (
                        <MyProfilePost key={index} post={post} />
                    ))
                ) : (
                    <div className="col-12">
                        <p className={style.nothing__posted}>Nothing posted</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProfileDesc;
