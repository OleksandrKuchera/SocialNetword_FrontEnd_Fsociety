import style from './style.module.scss';
import { useEffect, useState } from 'react';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { PostData } from '../Home';
import axios from 'axios';
import { TextPreview } from '../../functions/showText';
import CommentsContainer from '../../Comments/CommentsContainer';
import DropMenu, { Option } from '../../../__ui/DropMenu/DropMenu';

export type HomePostType = {
    postData: PostData,
}

const HomePost = ({ postData }: HomePostType) => {
    const [isLike, setIsLike] = useState(postData.post.isLiked);
    const navigate = useNavigate();
    const [likeCount, setLikeCount] = useState<number>(0);
    const [myProfileName, setMyProfileName] = useState<string>('');

    useEffect(() => {
        setLikeCount(postData.post.likes);
    }, [postData.post.likes])
    useEffect(() => {
        const getMyName = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.error('Access token not found in localStorage');
                    return;
                }
                const responseUser = await axios.get(`http://socialnetword-fsociety.onrender.com/api/mypage/${accessToken}`);
                setMyProfileName(responseUser.data.name);
            } catch (e) {
                console.log(e);
            }
        }
        getMyName()
    }, [])

    const addLike = async () => {
        try {
            const formData = new FormData();
            formData.append('name_user', myProfileName);
            formData.append('post_id', postData.id.toString());
            await axios.post('http://socialnetword-fsociety.onrender.com/posts/like/', formData);
        } catch (e) {
            console.log(e);
        }
    }
    const removeLike = async () => {
        try {
            const formData = new FormData();
            formData.append('name_user', myProfileName);
            formData.append('post_id', postData.id.toString());
            await axios.post('http://socialnetword-fsociety.onrender.com/posts/unlike/', formData);
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

    const deletePost = async () => {
        try {
            const dataForm = new FormData();
            dataForm.append('name_user', myProfileName);
            dataForm.append('post_id', postData.id.toString());
            await axios.post('http://socialnetword-fsociety.onrender.com/posts/delete/', dataForm);
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }

    const postMenuOptions: Option = {
        label: 'Delete post',
        onClick: deletePost,
    }
    const postMenuOptionsArray: Option[] = [];
    postMenuOptionsArray.push(postMenuOptions);

    return (
        <div className="col-12">
            <div className={style.post__container}>
                <div className="row d-flex justify-content-between">
                    <div className="col-5">
                        <div onClick={handleToProfile} className={style.post__top__container}>
                            <div className={style.post__profile__info}>
                                <img src={postData.author.avatar} alt="avatar" />
                                <h3>{postData.author.name}</h3>
                            </div>
                        </div>
                    </div>
                    {
                        myProfileName === postData.author.name ?
                            <div className="col-2">
                                <DropMenu options={postMenuOptionsArray} />
                            </div> : null
                    }

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
                            <p><TextPreview text={postData.post.description} lenghtText={35} /></p>
                        </div>
                    </div>
                </div>
                <CommentsContainer id={postData.id} comments={postData.post.comments} />
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
