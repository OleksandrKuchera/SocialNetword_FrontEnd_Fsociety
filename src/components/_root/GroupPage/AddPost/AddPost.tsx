import React, { ChangeEvent, Fragment, useState } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button, Dialog, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import style from './style.module.scss';
import { Add } from '@mui/icons-material';
import axios from 'axios';
import { green } from '@mui/material/colors';

type AddPostType = {
    userName: string,
}

const AddPost = ({ userName }: AddPostType) => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState<string>('');
    const [reel, setReel] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');
    const [postType, setPostType] = useState<'photo' | 'reels'>('photo'); // Default post type is 'photo'

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePhotoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        const MAX_FILE_SIZE_MB = 10;

        if (file) {
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                setErrorMessage(`File size exceeds ${MAX_FILE_SIZE_MB} MB`);
                setSelectedFile(null);
                setAvatar('');
            } else {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imageDataUrl = reader.result as string;
                    setAvatar(imageDataUrl);
                };
                reader.readAsDataURL(file); // Читаємо файл як URL або base64
                setSelectedFile(file);
                setErrorMessage('');
            }
        }
    };
    const handleReelsFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        const MAX_VIDEO_DURATION_SEC = 60;

        if (file) {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = () => {
                window.URL.revokeObjectURL(video.src);
                if (video.duration > MAX_VIDEO_DURATION_SEC) {
                    setErrorMessage(`Тривалість відео перевищує ${MAX_VIDEO_DURATION_SEC} секунд`);
                    setSelectedFile(null);
                    setReel('');
                } else {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const videoDataUrl = reader.result as string;
                        setReel(videoDataUrl);
                    };
                    reader.readAsDataURL(file); // Читаємо файл як URL або base64
                    setSelectedFile(file);
                    setErrorMessage('');
                }
            };
            video.src = URL.createObjectURL(file);
        }
    };

        const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(event.target.value);
        };

        const handlePostTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
            setPostType(event.target.value as 'photo' | 'reels');
            setSelectedFile(null); // Clear selected file when changing post type
            setAvatar('');
            setReel('');
            setDescription('');
        };

        const handleSubmit = async () => {
            setLoading(true); // Встановіть стан завантаження на true при початку відправки

            const formData = new FormData();
            if (selectedFile) {
                postType == 'photo' ?
                formData.append('image', selectedFile) : formData.append('video', selectedFile);

            }
            formData.append('description', description);
            formData.append('author', userName); // Hard-coded author value

            try {
                if (!selectedFile) {
                    setErrorMessage('No upload photo');
                    new Error('no photo')
                    setLoading(false);
                }
                postType == 'photo' ? await axios.post("https://socialnetword-fsociety.onrender.com/posts/create/", formData) :
                    await axios.post("https://socialnetword-fsociety.onrender.com/reels/create/", formData);
                setLoading(false);
                handleClose();
                window.location.reload();
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setErrorMessage(error.response?.data.errors.description[0]);
                } else {
                    setErrorMessage('')
                }
                setLoading(false);
            }
        };

        return (
            <Fragment>
                <button title='Add post' className={style.add__post} onClick={handleClickOpen}>
                    <Add />
                </button>
                <Dialog
                    onClose={handleClose}
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
                    <DialogContent>
                        <div className="row">
                            <div className="col-12">
                                <h2 className={style.add__post__title}>Add post</h2>
                            </div>
                        </div>
                        {errorMessage &&
                            <Alert style={{ color: 'orange' }} className='mb-3' variant="outlined" severity="warning">
                                {errorMessage}
                            </Alert>
                        }
                        <div className="row">
                            <div className="col-12">
                                <FormControl>
                                    <FormLabel style={{ color: 'white' }} id="demo-row-radio-buttons-group-label">Post Type</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={postType} onChange={handlePostTypeChange}
                                    >
                                        <FormControlLabel style={{ color: 'white' }} value="photo" control={<Radio color="success" sx={{
                                            color: green[800],
                                            '&.Mui-checked': {
                                                color: green[600],
                                            },
                                        }} />} label="Photo post" />
                                        <FormControlLabel style={{ color: 'white' }} value="reels" control={<Radio color="success" sx={{
                                            color: green[800],
                                            '&.Mui-checked': {
                                                color: green[600],
                                            },
                                        }} />} label="Reels" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className={style.add__post__container}>
                                    <div className="row">
                                        <div className="col-6 d-flex flex-column align-items-center justify-content-center">
                                            <input
                                                accept={postType == 'photo' ? 'image/*' : 'video/mp4'}
                                                id="contained-button-file"
                                                multiple
                                                type="file"
                                                style={{ display: 'none' }}
                                                onChange={postType == 'photo' ? handlePhotoFileChange : handleReelsFileChange}
                                            />
                                            <label htmlFor="contained-button-file">
                                                <Button className='edit__profile__btn' variant="contained" color="primary" component="span">
                                                    {postType === 'photo' ? 'Upload photo' : 'Upload reels'}
                                                </Button>
                                            </label>
                                            {avatar.length > 0 || reel.length > 0 ?
                                                <div className="row">
                                                    <div className="col-12 d-flex justify-content-center">
                                                        {postType == 'photo' ?
                                                            <img className={style.upload__img__post} src={avatar} alt="" /> :
                                                            <video className={style.upload__img__post} src={reel} controls/>
                                                        }

                                                    </div>
                                                </div>
                                                : null
                                            }
                                        </div>
                                        <div className="col-6 d-flex align-items-center justify-content-center">
                                            <label className={style.add__post__description}>
                                                Post description:
                                                <textarea name="description" value={description} onChange={handleDescriptionChange} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        {loading ?
                            <p className={style.add__post__submit__loading}>Loading...</p>
                            :
                            <button className={style.add__post__submit} type="submit" onClick={handleSubmit}> Add Post </button>
                        }
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }

    export default AddPost;

