import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

import { Link } from 'react-router-dom';

import { appStore } from '../../store/appStore.js';

export const Header = () => {
  const isAuth = appStore(state => state.isAuth);
  const setIsAuth = appStore(state => state.setIsAuth);
  const setUser = appStore(state => state.setUser);
  const user = appStore(state => state.user);

  const onClickLogout = () => {
    setUser(null);
    sessionStorage.removeItem('token');
    setIsAuth(false);
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>{user ? user.fullName : 'ARCHAKOV BLOG'}</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
