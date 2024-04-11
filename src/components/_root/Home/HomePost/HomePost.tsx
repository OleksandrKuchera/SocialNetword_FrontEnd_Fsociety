import style from './style.module.scss';
import { useState } from 'react';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router';

interface HomePostProps {
    author: string;
    image: string;
    description: string;
    avatar: string;
    likes: number;
}

const HomePost: React.FC<HomePostProps> = ({ author, image, description, avatar, likes }) => {
    const [isLike, setIsLike] = useState(false);
    const navigate = useNavigate();

    const handleLike = () => {
        setIsLike(!isLike);
    };

    const handleToProfile = () => {
        navigate(`/profile/${author}`);
    }

    return (
        <div className="col-12">
            <div className={style.post__container}>
                <div className="row">
                    <div className="col-5">
                        <div onClick={handleToProfile} className={style.post__top__container}>
                            <div className={style.post__profile__info}>
                                <img src={avatar} alt="avatar" />
                                <h3>{author}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <img className={style.post__img} src={image} alt="postImg" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className={style.post__text}>
                            <h3>{author}:</h3>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <div className={style.like__container}>
                            <button className='post__like' onClick={handleLike}>
                                {!isLike ? <FavoriteBorder /> : <Favorite style={{ color: 'red' }} />}
                            </button>
                            <p>{likes}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePost;
