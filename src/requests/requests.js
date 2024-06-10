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