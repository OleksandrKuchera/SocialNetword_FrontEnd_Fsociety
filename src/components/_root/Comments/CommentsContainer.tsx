import axios from "axios";
import InputChat from "../MessageComponents/InputChat/InputChat";
import style from './comments.module.scss'
import { useEffect, useState } from "react";
import CommentsItem from "./CommentsItem";
import { Comments } from "../Home/Home";

export type CommentsContainer = {
    id: number;
    comments: Comments[];
}

const CommentsContainer = ({ id, comments }: CommentsContainer) => {
    // const [comments, setComments] = useState(PostData.post.comments);
    const [myName, setMyName] = useState<string>('');


    useEffect(() => {
        const getMyProfile = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.error('Access token not found in localStorage');
                    return;
                }
                const responseUser = await axios.get(`http://127.0.0.1:8000/api/mypage/${accessToken}`);
                setMyName(responseUser.data.name);
            } catch (e) {
                console.log(e);
            }
        }
        getMyProfile();
    }, []);

    const sendComents = async (text: string) => {
        const formData = new FormData();
        formData.append('name_user', myName);
        formData.append('post_id', id.toString());
        formData.append('comment', text);
        await axios.post(`http://127.0.0.1:8000/posts/comment/`, formData);
    }

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className={style.comment__cloud}>
                    {comments.map((comment, index) => (
                            <CommentsItem key={index} autor={comment.author} text={comment.text} />
                        ))}
                    </div>
                </div>
            </div>
            <InputChat onEnter={sendComents} placeholder="Type a comment" />
        </div>
    );
}

export default CommentsContainer;