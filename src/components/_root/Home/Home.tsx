import { Container } from "react-bootstrap";
import style from './style.module.scss';
import RecomendationList from "./RecomendationList/RecomendationList";
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { MyProfileContext } from "../HomeLayout/HomeLayout";
import PostContainer from "./PostContainer/PostContainer";
import { useLocation } from "react-router-dom";
import ReelsContainer from "../Reels/ReelsContainer";

export type Author = {
    name: string;
    email: string;
    avatar: string;
}

export type PostData = {
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
export type ReelsData = {
    id: number,
    author: Author;
    reel: Reel;
}

export type Reel = {
    video: string;
    description: string;
    likes: number;
    isLiked: boolean;
    comments: Comments[]; // Assuming comments are of any type
}

export type Comments = {
    id: number;
    author: Author;
    text: string
}


const Home = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [reels, setReels] = useState<ReelsData[]>([]);
    const myProfile = useContext(MyProfileContext);
    const location = useLocation();
    const isReelsPage = location.pathname.includes('/reels');

    useEffect(() => {
        if (myProfile) {
            const fetchPosts = async () => {
                try {
                    let response;
                    if(isReelsPage){
                        response = await axios.get<ReelsData[]>(`https://socialnetword-fsociety.onrender.com/reels/reelsAll/${myProfile.name}`);
                        const sortedPosts = response.data.sort((a, b) => b.id - a.id);
                        setReels(sortedPosts);
                    } else {
                        response = await axios.get<PostData[]>(`https://socialnetword-fsociety.onrender.com/posts/look/${myProfile.name}`);
                        const sortedPosts = response.data.sort((a, b) => b.id - a.id);
                        setPosts(sortedPosts);
                    }

                } catch (error) {
                    console.error("Error fetching posts:", error);
                }
            };

            fetchPosts();
        }
    }, [myProfile, isReelsPage]);

    return (
        <>
            <div className="row">
                <div className="col-9">
                    <div className="row d-flex justify-content-center">
                        <div className="col-9">
                            <Container>
                                <div className={style.home__layout}>
                                    {myProfile ?
                                        isReelsPage ? <ReelsContainer reels={reels} myProfile={myProfile} /> : <PostContainer posts={posts} myProfile={myProfile} />
                                        : null}
                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
                <div className="col-3 m-0 p-0">
                    {myProfile ? <RecomendationList myProfile={myProfile} /> : null}
                </div>
            </div>
        </>
    );
}

export default Home;
