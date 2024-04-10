import { Container } from "react-bootstrap";
import style from './style.module.scss';
import HomePost from "./HomePost/HomePost";
import RecomendationList from "./RecomendationList/RecomendationList";
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Author {
    name: string;
    email: string;
    avatar: string;
}

interface Post {
    image: string;
    description: string;
    likes: number;
}

interface UserPosts {
    author: Author;
    posts: Post[];
}

const Home = () => {
    const [userPosts, setUserPosts] = useState<UserPosts[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get<UserPosts[]>("http://127.0.0.1:8000/posts/look/");
                setUserPosts(response.data);
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
                                        {userPosts.length > 0 ? (
                                            userPosts.map((userPost, index) => (
                                                <div key={index} className="col-12">
                                                    <h3>{userPost.author.name}</h3>
                                                    {userPost.posts.map((post, postIndex) => (
                                                        <HomePost
                                                            key={postIndex}
                                                            author={userPost.author.name}
                                                            image={post.image}
                                                            description={post.description}
                                                            avatar={userPost.author.avatar}
                                                            likes={post.likes}
                                                        />
                                                    ))}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-12">
                                                <p>Loading...</p>
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
