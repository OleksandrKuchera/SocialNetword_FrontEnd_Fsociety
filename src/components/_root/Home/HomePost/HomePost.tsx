import style from './style.module.scss';
import avatarPpst from '../../../../assets/image.png';
import postImg from '../../../../assets/image copy.png';
import { useState } from 'react';
import { FavoriteBorder, Favorite } from '@mui/icons-material';

const HomePost = () => {
    const [islike, setIsLike] = useState(false);


    const handleLike = () => {
        setIsLike(!islike)
    }
    return (
        <div className="col-12">
            <div className={style.post__container}>
                <div className="row">
                    <div className="col-5">
                        <div className={style.post__top__container}>
                            <div className={style.post__profile__info}>
                                <img src={avatarPpst} alt="avatar" />
                                <h3>psina__sutulaya</h3>
                                <p><span>&#xb7;</span>18h</p>
                            </div>
                            <button>Follow</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <img className={style.post__img} src={postImg} alt="postImg" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <div className={style.like__container}>
                            <button className='post__like' onClick={handleLike}>{!islike ? <FavoriteBorder /> : <Favorite style={{ color: 'red' }} />}</button>
                            <span>18</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePost;