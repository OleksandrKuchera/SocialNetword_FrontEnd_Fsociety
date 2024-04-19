import { Container } from "react-bootstrap";
import style from './style.module.scss';
import HomePost from "./HomePost/HomePost";
import RecomendationList from "./RecomendationList/RecomendationList";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CircularProgress } from "@mui/material";

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
    comments: string[]; // Assuming comments are of any type
}


const Home = () => {
    const [posts, setPosts] = useState<PostData[]>([]);

    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken'); // Отримуємо accessToken з localStorage
                if (!accessToken) {
                    console.error('Access token not found in localStorage');
                    return;
                }
                const responseMyProfile = await axios.get(`http://127.0.0.1:8000/api/mypage/${accessToken}`);
                const response = await axios.get<PostData[]>(`http://127.0.0.1:8000/posts/look/${responseMyProfile.data.name}`);
                setPosts(response.data.reverse());
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-9">
                    <div className="row d-flex justify-content-center">
                        <div className="col-9">
                            <Container>
                                <div className={style.home__layout}>
                                    <div className="row">
                                        {posts ? (
                                            posts.map((post, index) => (
                                                <div key={index} className="col-12">
                                                    <HomePost
                                                        key={index}
                                                        postData={post}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-12">
                                                <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <CircularProgress color="success" />
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
                <div className="col-3 m-0 p-0">
                    <RecomendationList />
                </div>
            </div>
        </>
    );
}

export default Home;
