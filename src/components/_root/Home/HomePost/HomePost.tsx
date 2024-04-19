import style from './style.module.scss';
import { useEffect, useState } from 'react';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { PostData } from '../Home';
import axios from 'axios';

type HomePostType = {
    postData:PostData,
}

const HomePost = ({postData} : HomePostType) => {
    const [isLike, setIsLike] = useState(postData.post.isLiked);
    const navigate = useNavigate();
    const [likeCount, setLikeCount] = useState<number>(0);

    useEffect(() => {
        setLikeCount(postData.post.likes);
    },[postData.post.likes])

    const addLike = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found in localStorage');
                return;
            }

            const responseUser = await axios.get(`http://127.0.0.1:8000/api/mypage/${accessToken}`);
            const formData = new FormData();
            formData.append('name_user', responseUser.data.name);
            formData.append('post_id', postData.id.toString());
            await axios.post('http://127.0.0.1:8000/posts/like/', formData);
        } catch (e) {
            console.log(e);
        }
    }
    const removeLike = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found in localStorage');
                return;
            }

            const responseUser = await axios.get(`http://127.0.0.1:8000/api/mypage/${accessToken}`);
            const formData = new FormData();
            formData.append('name_user', responseUser.data.name);
            formData.append('post_id', postData.id.toString());
            await axios.post('http://127.0.0.1:8000/posts/unlike/', formData);
        } catch (e) {
            console.log(e);
        }
    }

    const handleLike = () => {
        isLike ? removeLike() : addLike();
        isLike ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
        setIsLike(!isLike);
    };

    const handleToProfile = () => {
        navigate(`/profile/${postData.author.name}`);
    }

    return (
        <div className="col-12">
            <div className={style.post__container}>
                <div className="row">
                    <div className="col-5">
                        <div onClick={handleToProfile} className={style.post__top__container}>
                            <div className={style.post__profile__info}>
                                <img src={postData.author.avatar} alt="avatar" />
                                <h3>{postData.author.name}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <img className={style.post__img} src={postData.post.image} alt="postImg" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className={style.post__text}>
                            <h3>{postData.author.name}:</h3>
                            <p>{postData.post.description}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <div className={style.like__container}>
                            <button className='post__like' onClick={handleLike}>
                                {!isLike ? <FavoriteBorder /> : <Favorite style={{ color: 'red' }} />}
                            </button>
                            <p>{likeCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePost;
