import React, { useState, useEffect } from 'react';
import MyProfilePost from '../MyProfilePost/MyProfilePost';
import style from './style.module.scss';
import axios from 'axios';
import { userDataType } from '../../UserProfile/UserProfile';
import { Comments } from '../../Home/Home';

export type Author = {
    name: string;
    email: string;
    avatar: string;
}

type PostData = {
    id: number,
    author: Author;
    post: Post;
}

export type Post = {
    image: string;
    description: string;
    likes: number;
    isLiked: boolean;
    comments: Comments[]; // Assuming comments are of any type
}

type MyProfileDescProps = {
    userData: userDataType;
};

const MyProfileDesc: React.FC<MyProfileDescProps> = ({ userData }) => {
    const [userPosts, setUserPosts] = useState<PostData[]>([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get<PostData[]>(`http://socialnetword-fsociety.onrender.com/posts/lookPostUser/${userData.name}`);
                const sortedPosts = response.data.sort((a, b) => b.id - a.id);
                setUserPosts(sortedPosts);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        fetchUserPosts();
    }, [userData]);

    return (
        <div className={style.desc__container}>
            <div className="row">
                {userPosts.length !== 0 ? (
                    userPosts.map((post) => (
                        <MyProfilePost key={post.id} id={post.id} autor={post.author} post={post.post} />
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
