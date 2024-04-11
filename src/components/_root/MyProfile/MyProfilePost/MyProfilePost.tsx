import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './style.scss';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { userDataType } from '../../UserProfile/UserProfile';

type Post = {
    image: string;
    description: string;
    likes: number
};

type MyProfilePostProps = {
    post: Post;
    userInfo: userDataType
};

const MyProfilePost: React.FC<MyProfilePostProps> = ({ post, userInfo }) => {
    const [open, setOpen] = useState(false);
    const [isLike, setIsLike] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLike = () => {
        setIsLike(!isLike);
    };

    return (
        <div className="col-4">
            <React.Fragment>
                <Button className='post__img' variant="outlined" onClick={handleClickOpen}>
                    <img className='post__img__label)' src={post.image} alt="postImgTitle" />
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
                            <div className="col-6">
                                <img className='open__post__img' src={post.image} alt="postImgTitle" />
                            </div>
                            <div className="col-6 d-flex flex-column justify-content-between">
                                <div className="profile__container">
                                    <div className="row">
                                        <div className="col-3">
                                            <img src={userInfo.avatar} alt="avatar" />
                                        </div>
                                        <div className="col-9">
                                            <h2>{userInfo.name}</h2>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <p className='post__description'>{post.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3">
                                        <button className='post__like' onClick={handleLike}>{!isLike ? <FavoriteBorder /> : <Favorite style={{ color: 'red' }} />}</button>
                                        <p>{post.likes}</p>
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

export default MyProfilePost;
