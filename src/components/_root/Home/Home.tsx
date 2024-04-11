import { Container } from "react-bootstrap";
import style from './style.module.scss';
import HomePost from "./HomePost/HomePost";
import RecomendationList from "./RecomendationList/RecomendationList";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CircularProgress } from "@mui/material";

interface Author {
    name: string;
    email: string;
    avatar: string;
}

interface Post {
    author: Author;
    image: string;
    description: string;
    likes: number;
}


const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get<Post[]>("http://127.0.0.1:8000/posts/look/");
                setPosts(response.data.reverse());
                console.log(response.data)
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
                                        {posts.length > 0 ? (
                                            posts.map((post, index) => (
                                                <div key={index} className="col-12">
                                                    <HomePost
                                                        key={index}
                                                        author={post.author.name}
                                                        image={post.image}
                                                        description={post.description}
                                                        avatar={post.author.avatar}
                                                        likes={post.likes}
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
