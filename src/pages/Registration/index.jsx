import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';

import { registration } from '../../requests/requests.js';
import { useForm } from 'react-hook-form';
import { appStore } from '../../store/appStore.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Registration = () => {

    const setIsAuth = appStore((state) => state.setIsAuth);
    const setUser = appStore((state) => state.setUser);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: '',
            passwordHash: '',
            fullName: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        await registration(values)
            .then((data) => {
                setUser(data.data);
                return data.data;
            })
            .then((user) => {
                sessionStorage.setItem('token', user.token);
            })
            .then(() => {
                setIsAuth(true);
                navigate('/');
            })
            .catch((err) => toast.error(err.response.data.message))
    };

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography
                classes={{ root: styles.title }}
                variant='h5'
            >
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label='Полное имя'
                    fullWidth
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    {...register('fullName', { required: 'Enter full name!' })}
                />
                <TextField
                    className={styles.field}
                    label='E-Mail'
                    fullWidth
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', { required: 'Enter email' })}
                />
                <TextField
                    className={styles.field}
                    label='Пароль'
                    fullWidth
                    {...register('passwordHash', {
                        required: 'Enter password',
                    })}
                    helperText={errors.passwordHash?.message}
                    error={Boolean(errors.passwordHash?.message)}
                />
                <Button
                    size='large'
                    variant='contained'
                    fullWidth
                    type='submit'
                >
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>
    );
};
