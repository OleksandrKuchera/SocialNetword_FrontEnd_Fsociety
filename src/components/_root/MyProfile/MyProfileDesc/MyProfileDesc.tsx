import React, { useState, useEffect } from 'react';
import MyProfilePost from '../MyProfilePost/MyProfilePost';
import style from './style.module.scss';
import axios from 'axios';
import { userDataType } from '../../UserProfile/UserProfile';
import { Comments, ReelsData } from '../../Home/Home';
import { CircularProgress } from '@mui/material';
import { postOrReelsType } from '../MyProfile';
import MyProfileReel from '../MyProfileReels/MyProfileReels';

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
    myProfile: userDataType
    postOrReels: postOrReelsType
};

const MyProfileDesc: React.FC<MyProfileDescProps> = ({ userData, myProfile, postOrReels }) => {
    const [userPosts, setUserPosts] = useState<PostData[]>([]);
    const [userReels, setUserReels] = useState<ReelsData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                setLoading(false);
                if (postOrReels === 'post') {
                    const response = await axios.get<PostData[]>(`https://socialnetword-fsociety.onrender.com/posts/lookPostUser/${userData.name}`);
                    const sortedPosts = response.data.sort((a, b) => b.id - a.id);
                    setUserPosts(sortedPosts);
                } else {
                    const response = await axios.get<ReelsData[]>(`https://socialnetword-fsociety.onrender.com/reels/reelsUser/${userData.name}`);
                    const sortedPosts = response.data.sort((a, b) => b.id - a.id);
                    setUserReels(sortedPosts);
                }
                setLoading(true);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        fetchUserPosts();
    }, [userData, postOrReels]);

    return (
        <div className={style.desc__container}>
            <div className="row">
                {
                    loading ? postOrReels === 'post' ?
                        userPosts.length !== 0 && myProfile ? (
                            userPosts.map((post) => (
                                <MyProfilePost key={post.id} myProfile={myProfile} id={post.id} autor={post.author} post={post.post} />
                            ))
                        ) : (
                            <div className="col-12">
                                <p className={style.nothing__posted}>Nothing posted</p>
                            </div>
                        ) :
                        userReels.length !== 0 && myProfile ? (
                            userReels.map((reel) => (
                                <MyProfileReel key={reel.id} myProfile={myProfile} id={reel.id} autor={reel.author} reel={reel.reel} />
                            ))
                        ) : (
                            <div className="col-12">
                                <p className={style.nothing__posted}>Nothing posted</p>
                            </div>
                        )
                        :
                        <div className='col-12 d-flex justify-content-center align-items-center'>
                            <CircularProgress color="success" />
                        </div>
                }
            </div>
        </div>
    );
};

export default MyProfileDesc;
