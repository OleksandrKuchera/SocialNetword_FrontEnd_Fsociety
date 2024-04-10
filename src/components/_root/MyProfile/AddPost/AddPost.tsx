import React, { Fragment, useState } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog } from '@mui/material';
import style from './style.module.scss';
import { Add } from '@mui/icons-material';
import axios from 'axios';

const AddPost: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target.files ? event.target.files[0] : null);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        if (selectedFile) {
            formData.append('image', selectedFile); // Append selected file to 'image' key
        }
        formData.append('description', description);
        formData.append('author', 'Bogdan'); // Hard-coded author value

        try {
            const response = await axios.post("http://127.0.0.1:8000/posts/create/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Ensure proper headers for FormData
                }
            });
            console.log(response.data);
            handleClose(); // Close dialog on successful submit
        } catch (error) {
            console.error("Error adding post:", error);
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
                                    <div className="col-3 d-flex align-items-center justify-content-center">
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
                                    </div>
                                    <div className="col-9 d-flex align-items-center justify-content-center">
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
                    <button className={style.add__post__submit} type="submit" onClick={handleSubmit}>Add post</button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default AddPost;
