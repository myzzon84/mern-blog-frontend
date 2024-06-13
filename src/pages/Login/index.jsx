import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';

import { useForm } from 'react-hook-form';
import { login } from '../../requests/requests.js';
import { appStore } from '../../store/appStore.js';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const navigate = useNavigate();
    const setIsAuth = appStore((state) => state.setIsAuth);
    const setUser = appStore((state) => state.setUser);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        let user = await login(values);
        if (user) {
            setUser(user.data);
            setIsAuth(true);
            localStorage.setItem('token', user.data.token);
            navigate('/');
        }
    };

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography
                classes={{ root: styles.title }}
                variant='h5'
            >
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label='E-Mail'
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', { required: 'Enter email' })}
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    label='Пароль'
                    {...register('passwordHash', {
                        required: 'Enter password',
                    })}
                    helperText={errors.password?.message}
                    error={Boolean(errors.password?.message)}
                    fullWidth
                />
                <Button
                    size='large'
                    variant='contained'
                    fullWidth
                    type='submit'
                >
                    Войти
                </Button>
            </form>
        </Paper>
    );
};
