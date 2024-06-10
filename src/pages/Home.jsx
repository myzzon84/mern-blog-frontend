import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { appStore } from '../store/appStore.js';
import { getAllPosts } from '../requests/requests.js';
import { getLastTags } from '../requests/requests.js';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

export const Home = () => {
    const posts = appStore((state) => state.posts);
    const setPosts = appStore((state) => state.setPosts);
    const tags = appStore((state) => state.tags);
    const setTags = appStore((state) => state.setTags);

    const [loadingPosts, setLoadingPosts] = useState(false);
    const [loadingTags, setLoadingTags] = useState(false);

    useEffect(() => {
        setLoadingPosts(true);
        getAllPosts()
            .then(data => setPosts(data.data))
            .then(() => setLoadingPosts(false))
            .catch((err) => {
                console.log(err);
                setLoadingPosts(false);
            });
    }, []);

    useEffect(() => {
        setLoadingTags(true);
        getLastTags()
            .then(data => setTags(data))
            .then(() => setLoadingTags(false))
            .catch((err) => {
                console.log(err);
                setLoadingTags(false);
            });
    }, []);

    return (
        <>
            <Tabs
                style={{ marginBottom: 15 }}
                value={0}
                aria-label='basic tabs example'
            >
                <Tab label='Новые' />
                <Tab label='Популярные' />
            </Tabs>
            <Grid
                container
                spacing={4}
            >
                <Grid
                    xs={8}
                    item
                >
                    {posts?.map((item, i) => (
                        <Post
                            id={item._id}
                            title={item.title}
                            imageUrl='https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png'
                            user={{
                                avatarUrl:
                                    'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                                fullName: item.user.fullName,
                            }}
                            createdAt={new Date(
                                item.user.createdAt.split('T')[0]
                            ).toLocaleString('ru', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                            viewsCount={item.viewsCount}
                            commentsCount={3}
                            tags={item.tags.length ? item.tags : null}
                            isEditable
                            key={i}
                            isLoading={loadingPosts}
                        />
                    ))}
                </Grid>
                <Grid
                    xs={4}
                    item
                >
                    <TagsBlock
                        items={tags ? tags : ['react', 'typescript', 'заметки']}
                        isLoading={loadingTags}
                    />
                    <CommentsBlock
                        items={[
                            {
                                user: {
                                    fullName: 'Вася Пупкин',
                                    avatarUrl:
                                        'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Это тестовый комментарий',
                            },
                            {
                                user: {
                                    fullName: 'Иван Иванов',
                                    avatarUrl:
                                        'https://mui.com/static/images/avatar/2.jpg',
                                },
                                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                            },
                        ]}
                        isLoading={false}
                    />
                </Grid>
            </Grid>
        </>
    );
};
