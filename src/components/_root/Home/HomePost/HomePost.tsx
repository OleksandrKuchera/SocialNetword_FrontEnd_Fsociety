import style from './style.module.scss';
import { useEffect, useState } from 'react';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { PostData } from '../Home';

type HomePostType = {
    postData:PostData,
}

const HomePost = ({postData} : HomePostType) => {
    const [isLike, setIsLike] = useState(false);
    const navigate = useNavigate();
    const [likeCount, setLikeCount] = useState<number>(0);

    useEffect(() => {
        setLikeCount(postData.post.likes);
    },[postData.post.likes])

    const handleLike = () => {
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
