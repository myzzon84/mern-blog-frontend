import axios from '../axios/axios.js';

export const getAllPosts = async () => {
    let posts = await axios.get('/posts');
    return posts;
}

export const getLastTags = async () => {
    let lastTags = await axios.get('/posts/tags');
    return lastTags.data;
}

export const getPostById = async (id) => {
    let post = await axios.get(`/posts/one/${id}`);
    return post;
}

export const getUserById = async (id) => {
    let user = await axios.post('/user', {id});
    return user;
}

export const login = async (params) => {
    let userData = await axios.post('/auth/login', params);
    return userData;
}

export const getMe = async () => {
    let meData = await axios.get('/auth/me');
    return meData;
}