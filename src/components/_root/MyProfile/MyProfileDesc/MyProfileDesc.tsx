import React, { useState, useEffect } from 'react';
import MyProfilePost from '../MyProfilePost/MyProfilePost';
import style from './style.module.scss';
import axios from 'axios';
import { userDataType } from '../../UserProfile/UserProfile';

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
    comments: string[]; // Assuming comments are of any type
}

type MyProfileDescProps = {
    userData: userDataType;
};




const MyProfileDesc: React.FC<MyProfileDescProps> = ({ userData }) => {
    const [userPosts, setUserPosts] = useState<PostData[]>()

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get<PostData[]>(`http://127.0.0.1:8000/posts/lookPostUser/${userData.name}`);
                setUserPosts(response.data.reverse());
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        fetchUserPosts();
    }, [userData]);

    return (
        <div className={style.desc__container}>
            <div className="row">
                {userPosts ? (
                    userPosts.map((post, index) => (
                        <MyProfilePost key={index} id={post.id} autor= {post.author} post = {post.post}/>
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