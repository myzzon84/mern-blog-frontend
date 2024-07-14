import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './UpdatePost.module.scss';

import axios from '../../axios/axios.js';
import { getPostById, updatePost } from '../../requests/requests.js';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { appStore } from '../../store/appStore.js';

export const UpdatePost = () => {
    const navigate = useNavigate();
    const edit = appStore((state) => state.edit);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tagsString, setTagsString] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const inputFileRef = useRef(null);

    const handleChangeFile = async (e) => {
        try {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            const { data } = await axios.post('/upload', formData);
            setImageUrl(data.url);
        } catch (error) {
            console.warn(error);
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('');
    };

    const onChange = React.useCallback((value) => {
        setText(value);
    }, []);

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        []
    );

    const onSubmit = async () => {
        let tags = [];

        let newTags = '';

        for (let i = 0; i < tagsString.length; i++) {
            if (tagsString[i] === ' ') {
                if (
                    tagsString[i - 1] === ',' ||
                    tagsString[i + 1] === ',' ||
                    tagsString[i + 1] === ' ' ||
                    i === tagsString.length - 1
                ) {
                    continue;
                } else {
                    newTags += tagsString[i];
                }
            } else {
                newTags += tagsString[i];
            }
        }

        try {
            if (newTags.includes(',')) {
                tags = newTags.split(',');
            } else {
                tags = newTags.split(' ');
            }
        } catch (error) {
            console.log(error);
            tags = [];
        }

        let fields = {
            title,
            text,
            tags,
            imageUrl,
        };

        updatePost(fields)
            .then((data) => {
                console.log(data);
                return data;
            })
            .then((data) => {
                navigate(`/posts/${data.data._id}`);
            })
            .catch((err) => {
                console.log(err);
                if (Array.isArray(err.response.data)) {
                    err.response.data.map((item) => {
                        toast.error(item.msg);
                    });
                }else{
                    toast.error(err.response.data.message);
                }
            });
    };

    return (
        <Paper style={{ padding: 30 }}>
            <Button
                variant='outlined'
                size='large'
                onClick={() => inputFileRef.current.click()}
            >
                Загрузить превью
            </Button>
            <input
                type='file'
                onChange={handleChangeFile}
                hidden
                ref={inputFileRef}
            />
            {imageUrl && (
                <Button
                    variant='contained'
                    color='error'
                    onClick={onClickRemoveImage}
                >
                    Удалить
                </Button>
            )}
            {imageUrl && (
                <img
                    className={styles.image}
                    src={`http://localhost:4444${imageUrl}`}
                    alt='Uploaded'
                />
            )}
            <br />
            <br />
            <TextField
                classes={{ root: styles.title }}
                variant='standard'
                placeholder='Заголовок статьи...'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
            />
            <TextField
                classes={{ root: styles.tags }}
                variant='standard'
                placeholder='Тэги'
                value={tagsString}
                onChange={(e) => setTagsString(e.target.value)}
                fullWidth
            />
            <SimpleMDE
                className={styles.editor}
                value={text}
                onChange={onChange}
                options={options}
            />
            <div className={styles.buttons}>
                <Button
                    size='large'
                    variant='contained'
                    onClick={onSubmit}
                >
                    {edit ? 'Сохранить' : 'Опубликовать'}
                </Button>
                <a href='/'>
                    <Button size='large'>Отмена</Button>
                </a>
            </div>
        </Paper>
    );
};
