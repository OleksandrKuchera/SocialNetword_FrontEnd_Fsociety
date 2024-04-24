import React, { ChangeEvent, Fragment, useState } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog } from '@mui/material';
import style from './style.module.scss';
import { Add } from '@mui/icons-material';
import axios from 'axios';

type AddPostType = {
    userName: string,
}

const AddPost = ({ userName }: AddPostType) => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState<string>('');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {

        setSelectedFile(e.target.files ? e.target.files[0] : null)

        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataUrl = reader.result as string;
                setAvatar(imageDataUrl);
            };
            reader.readAsDataURL(file); // Читаємо файл як URL або base64
        }
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true); // Встановіть стан завантаження на true при початку відправки

        const formData = new FormData();
        if (selectedFile) {
            formData.append('image', selectedFile); // Append selected file to 'image' key
        }
        formData.append('description', description);
        formData.append('author', userName); // Hard-coded author value

        try {
            const response = await axios.post("http://127.0.0.1:8000/posts/create/", formData);
            console.log(response.data);
            setLoading(false); // При успішному відправленні встановіть стан завантаження на false
            handleClose(); // Закрийте діалогове вікно при успішній відправці
            window.location.reload();
        } catch (error) {
            console.error("Error adding post:", error);
            setLoading(false); // При помилці також встановіть стан завантаження на false
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
                    <div className="row">
                        <div className="col-12">
                            <div className={style.add__post__container}>
                                <div className="row">
                                    <div className="col-6 d-flex flex-column align-items-center justify-content-center">
                                        <input
                                            accept="image/*"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button className='edit__profile__btn' variant="contained" color="primary" component="span">
                                                Upload post photo
                                            </Button>
                                        </label>
                                        {avatar.length > 0 ?
                                            <div className="row">
                                                <div className="col-12 d-flex justify-content-center">
                                                    <img className={style.upload__img__post} src={avatar} alt="" />
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

