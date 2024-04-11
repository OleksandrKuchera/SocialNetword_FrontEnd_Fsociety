import React, { useState, useEffect } from 'react';
import MyProfilePost from '../MyProfilePost/MyProfilePost';
import style from './style.module.scss';
import axios from 'axios';
import { userDataType } from '../../UserProfile/UserProfile';

type PostDeclarate = {
    author: userDataType;
    posts:Post[]

};
type Post = {
    image: string;
    description: string;
    likes: number;
}
type MyProfileDescProps = {
    userData: userDataType;
};

const MyProfileDesc: React.FC<MyProfileDescProps> = ({ userData }) => {
    const [userPosts, setUserPosts] = useState<Post[]>([]); 
    const [userInfo, setUserInfo] = useState<userDataType>({
        name: '',
        postCount: 0,
        friendsCount: 0,
        followersCount: 0,
        located: '',
        birth_date: '',
        bio: '',
        avatar: '',
        isFollow: false,
        friends_count: 0,
        subscribers_count : 0,
    }); 

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get<PostDeclarate[]>(`http://127.0.0.1:8000/posts/lookPostUser/${userData.name}`);
                const autor = response.data[0].author;
                const posts = response.data[0].posts
                setUserPosts(posts.reverse());
                setUserInfo(autor)
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        fetchUserPosts();
    }, [userData]);

    return (
        <div className={style.desc__container}>
            <div className="row">
                {userPosts.length > 0 ? (
                    userPosts.map((post, index) => (
                        <MyProfilePost key={index} post={post} userInfo={userInfo}/>
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
