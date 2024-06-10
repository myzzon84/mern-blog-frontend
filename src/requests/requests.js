import axios from '../axios/axios.js';

export const getAllPosts = async () => {
    let posts = await axios.get('/posts');
    return posts;
}

export const getLastTags = async () => {
    let lastTags = await axios.get('/posts/tags');
    return lastTags.data;
}