import { Container } from "react-bootstrap";
import style from './style.module.scss';
// import HomePost from "./HomePost/HomePost";
// import RecomendationList from "./RecomendationList/RecomendationList";
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { CircularProgress } from "@mui/material";
import { MyProfileContext } from "../HomeLayout/HomeLayout";

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

export type Comments = {
    id: number;
    author: Author;
    text: string
}


const GroupPage = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const myProfile = useContext(MyProfileContext);

    useEffect(() => {
        if (myProfile) {
            const fetchPosts = async () => {
                try {
                    const response = await axios.get<PostData[]>(`https://socialnetword-fsociety.onrender.com/posts/look/${myProfile.name}`);
                    const sortedPosts = response.data.sort((a, b) => b.id - a.id);
                    setPosts(sortedPosts);
                } catch (error) {
                    console.error("Error fetching posts:", error);
                }
            };

            fetchPosts();
        }
    }, [myProfile]);

    return (
        <>
            <div className="row">
                <div className="col-9">
                    <div className="row d-flex justify-content-center">
                        <div className="col-9">
                            <Container>
                                <div className={style.home__layout}>
                                    <div className="row">
                                        {(posts.length != 0 && myProfile) ? (
                                            posts.map((post, index) => (
                                                <div key={index} className="col-12">
                                                    {/* <HomePost
                                                        myProfile={myProfile}
                                                        key={index}
                                                        postData={post}
                                                    /> */}
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
                {/* <div className="col-3 m-0 p-0">
                    {myProfile ? <RecomendationList myProfile={myProfile} /> : null  }
                </div> */}
            </div>
        </>
    );
}

export default GroupPage;
