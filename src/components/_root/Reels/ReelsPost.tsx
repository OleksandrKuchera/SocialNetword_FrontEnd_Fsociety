import style from '../Home/HomePost/style.module.scss';
import { useEffect, useRef, useState } from 'react';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Author, ReelsData } from '../Home/Home';
import DropMenu, { Option } from '../../__ui/DropMenu/DropMenu';
import { TextPreview } from '../functions/showText';
import CommentsContainer from '../Comments/CommentsContainer';

export type HomePostType = {
    postData: ReelsData,
    myProfile: Author,
}

const ReelsPost = ({ postData, myProfile }: HomePostType) => {
    const [isLike, setIsLike] = useState(postData.reel.isLiked);
    const navigate = useNavigate();
    const [likeCount, setLikeCount] = useState<number>(0);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        setLikeCount(postData.reel.likes);
    }, [postData.reel.likes])

    useEffect(() => {
        const currentVideoRef = videoRef.current;
    
        const observer = new IntersectionObserver(
            entries => {
                if (currentVideoRef) {
                    if (entries[0].isIntersecting) {
                        currentVideoRef.play();
                    } else {
                        currentVideoRef.pause();
                    }
                }
            },
            {
                threshold: 0.5
            }
        );
    
        if (currentVideoRef) {
            observer.observe(currentVideoRef);
        }
    
        return () => {
            if (currentVideoRef) {
                observer.unobserve(currentVideoRef);
            }
        };
    }, []);
    

    const addLike = async () => {
        try {
            const formData = new FormData();
            formData.append('name_user', myProfile.name);
            formData.append('post_id', postData.id.toString());
            await axios.post('https://socialnetword-fsociety.onrender.com/reels/like/', formData);
        } catch (e) {
            console.log(e);
        }
    }
    const removeLike = async () => {
        try {
            const formData = new FormData();
            formData.append('name_user', myProfile.name);
            formData.append('post_id', postData.id.toString());
            await axios.post('https://socialnetword-fsociety.onrender.com/reels//unlike/', formData);
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
            dataForm.append('name_user', myProfile.name);
            dataForm.append('post_id', postData.id.toString());
            await axios.post('https://socialnetword-fsociety.onrender.com/reels/delete/', dataForm);
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
                    <div className="col-10">
                        <div onClick={handleToProfile} className={style.post__top__container}>
                            <div className={style.post__profile__info}>
                                <div className="row">
                                    <div className="col-6">
                                        <img src={postData.author.avatar} alt="avatar" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h3>{postData.author.name}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        myProfile.name === postData.author.name ?
                            <div className="col-2">
                                <DropMenu options={postMenuOptionsArray} />
                            </div> : null
                    }

                </div>
                <div className="row">
                    <div className="col-12">
                        <video ref={videoRef} className={style.post__img} src={postData.reel.video} controls/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className={style.post__text}>
                            <h3>{postData.author.name}:</h3>
                            <p><TextPreview text={postData.reel.description} lenghtText={35} /></p>
                        </div>
                    </div>
                </div>
                <CommentsContainer myProfile={myProfile} id={postData.id} comments={postData.reel.comments} postOrReel='reels'/>
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

export default ReelsPost;
