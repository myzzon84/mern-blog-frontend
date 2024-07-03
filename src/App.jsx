import Container from '@mui/material/Container';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { getMe, checkToken, getAllPosts } from './requests/requests.js';

import { Routes, Route } from 'react-router-dom';

import { appStore } from './store/appStore.js';
import { useEffect } from 'react';
import { ToastContainer, Bounce } from 'react-toastify';

function App() {
    const setIsAuth = appStore((state) => state.setIsAuth);
    const setUser = appStore((state) => state.setUser);
    const setPosts = appStore((state) => state.setPosts);

    useEffect(() => {
        getMe()
            .then((data) => setUser(data.data))
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        let token = sessionStorage.getItem('token');
        checkToken({ token })
            .then((data) => {
                if (data.data.status === 200) {
                    setIsAuth(true);
                }
                if (data.data.status === 400) {
                    sessionStorage.removeItem('token');
                    setIsAuth(false);
                }
            })
            .catch((err) => {
                console.log(err);
                sessionStorage.removeItem('token');
                setIsAuth(false);
            });
    }, []);
    useEffect(() => {
        getAllPosts()
            .then((posts) => setPosts(posts.data));
    },[]);
    return (
        <>
            <Header />
            <Container maxWidth='lg'>
                <Routes>
                    <Route
                        path='/'
                        element={<Home />}
                    />
                    <Route
                        path='/posts/:id'
                        element={<FullPost />}
                    />
                    <Route
                        path='/posts/create'
                        element={<AddPost />}
                    />
                    <Route
                        path='/login'
                        element={<Login />}
                    />
                    <Route
                        path='/register'
                        element={<Registration />}
                    />
                </Routes>
            </Container>
            <ToastContainer
                position='bottom-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
                transition={Bounce}
            />
        </>
    );
}

export default App;
