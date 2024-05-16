import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import '../MyProfilePost/style.scss';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Author } from '../MyProfileDesc/MyProfileDesc';
import axios from 'axios';
import CommentsContainer from '../../Comments/CommentsContainer';
import { TextPreview } from '../../functions/showText';
import { Option } from '../../../__ui/DropMenu/DropMenu';
import DropMenu from '../../../__ui/DropMenu/DropMenu';
import { userDataType } from '../../HomeLayout/HomeLayout';
import { Reel } from '../../Home/Home';
import { getVideoThumbnail } from '../../functions/getVideoThumbnail';

export type MyProfileReelProps = {
    id: number,
    reel: Reel,
    autor: Author,
    myProfile: userDataType,
};

const MyProfileReel = ({ id, reel, autor, myProfile }: MyProfileReelProps) => {
    const [open, setOpen] = useState(false);
    const [isLike, setIsLike] = useState(reel.isLiked);
    const [thumbnail, setThumbnail] = useState<string>('');
    const [likeCount, setLikeCount] = useState<number>(0);

    useEffect(() => {
        setLikeCount(reel.likes);

        // Generate thumbnail
        getVideoThumbnail(reel.video)
            .then((thumb) => setThumbnail(thumb as string))
            .catch((e) => console.error('Error generating thumbnail:', e));
    }, [reel.likes, reel.video]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addLike = async () => {
        try {
            const formData = new FormData();
            formData.append('name_user', myProfile.name);
            formData.append('reel_id', id.toString());
            await axios.post('https://socialnetword-fsociety.onrender.com/reels/like/', formData);
        } catch (e) {
            console.log(e);
        }
    }
    const removeLike = async () => {
        try {
            const formData = new FormData();
            formData.append('name_user', autor.name);
            formData.append('reel_id', id.toString());
            await axios.post('https://socialnetword-fsociety.onrender.com/reels/unlike/', formData);
        } catch (e) {
            console.log(e);
        }
    }

    const handleLike = () => {
        isLike ? removeLike() : addLike();
        isLike ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
        setIsLike(!isLike);
    };

    const deletePost = async () => {
        try {
            const dataForm = new FormData();
            dataForm.append('name_user', autor.name);
            dataForm.append('post_id', id.toString());
            await axios.post('https://socialnetword-fsociety.onrender.com/reels/delete/', dataForm)
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
        <div className="col-4 d-flex justify-content-center">
            <React.Fragment>
                <Button className='post__img' variant="outlined" onClick={handleClickOpen}>
                    {thumbnail ? <img className='post__img__label)' src={thumbnail} alt="postImgTitle" /> : null}
                </Button>
                <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth='md'
                >
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <div className="row">
                            <div className="col-6 d-flex justify-content-center">
                                <video className='open__post__img' src={reel.video} controls />
                            </div>
                            <div className="col-6 d-flex flex-column justify-content-between">
                                <div className="profile__container">
                                    <div className="row d-flex justify-content-between align-items-center">
                                        <div className="col-10">
                                            <div className="row justify-content-start align-items-center">
                                                <div className="col-3">
                                                    <img src={autor.avatar} alt="avatar" />
                                                </div>
                                                <div className="col-6">
                                                    <h2>{autor.name}</h2>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            myProfile.name === autor.name ?
                                                <div className="col-2">
                                                    <DropMenu options={postMenuOptionsArray} />
                                                </div> : null
                                        }
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <p className='post__description'><TextPreview text={reel.description} lenghtText={35} /></p>
                                        </div>
                                    </div>
                                    <CommentsContainer myProfile={myProfile} maxHeightValue='50vh' heightValue='50vh' id={id} comments={reel.comments} postOrReel={'reels'}/>
                                </div>
                                <div className="row">
                                    <div className="col-3 d-flex align-items-center">
                                        <button className='post__like' onClick={handleLike}>{!isLike ? <FavoriteBorder /> : <Favorite style={{ color: 'red' }} />}</button>
                                        <p style={{ color: 'white' }}>{likeCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        </div>
    );
};

export default MyProfileReel;
