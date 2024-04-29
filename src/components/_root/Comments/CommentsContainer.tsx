import axios from "axios";
import InputChat from "../MessageComponents/InputChat/InputChat";
import style from './comments.module.scss'
import { useEffect, useState } from "react";
import CommentsItem from "./CommentsItem";
import { Author, Comments } from "../Home/Home";

export type CommentsContainer = {
    id: number;
    comments: Comments[];
    maxHeightValue?: string;
    heightValue?: string;
}

const CommentsContainer = ({ id, comments, maxHeightValue, heightValue }: CommentsContainer) => {
    const [commentsCollection, setCommentsCollection] = useState<Comments[]>(comments);
    const [myName, setMyName] = useState<Author>();

    useEffect(() => {
        const getMyProfile = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.error('Access token not found in localStorage');
                    return;
                }
                const responseUser = await axios.get(`http://127.0.0.1:8000/api/mypage/${accessToken}`);
                setMyName(responseUser.data);
            } catch (e) {
                console.log(e);
            }
        }
        getMyProfile();
    }, []);

    const sendComents = async (text: string) => {
        if(myName) {
            const formData = new FormData();
            formData.append('name_user', myName.name);
            formData.append('post_id', id.toString());
            formData.append('comment', text);
            try {
                await axios.post(`http://127.0.0.1:8000/posts/comment/`, formData);
                const newComment = {
                    id: 0,
                    author: {
                        name: myName.name,
                        avatar: myName.avatar.slice(13),
                        email: myName.email
                    },
                    text: text
                }
    
                setCommentsCollection(prevComments => [...prevComments, newComment]);
    
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div style={{ maxHeight: maxHeightValue, height: heightValue }} className={style.comment__cloud}>
                        {myName ? commentsCollection.map((comment, index) => (
                            <CommentsItem myName={myName.name} id={comment.id} key={index} autor={comment.author} text={comment.text} />
                        )): null}
                    </div>
                </div>
            </div>
            <InputChat onEnter={sendComents} placeholder="Type a comment" />
        </div>
    );
}

export default CommentsContainer;