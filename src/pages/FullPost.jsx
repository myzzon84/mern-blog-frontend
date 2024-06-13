import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';

import { appStore } from '../store/appStore.js';
import { getPostById, getUserById } from '../requests/requests.js';

export const FullPost = () => {
    const { id } = useParams();

    const onePost = appStore((state) => state.onePost);
    const setOnePost = appStore((state) => state.setOnePost);
    const posts = appStore((state) => state.posts);

    const [postLoading, setPostLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getPostById(id)
            .then((data) => {
                setOnePost(data.data);
                return data.data;
            })
            .then((data) => {
                setPostLoading(false);
                return data;
            })
            .then((data) => {
                getUserById(data.user)
                .then((user) => {
                    setUser(user);
                    setUserLoading(false);
                })
            })
            .catch((err) => {
                setPostLoading(false);
                console.log(err);
            });
    }, []);

    if (postLoading || userLoading) {
        return <Post isLoading={postLoading} />;
    }

    return (
        <>
            <Post
                id={onePost._id}
                title={onePost.title}
                imageUrl={onePost.imageUrl}
                user={{
                    avatarUrl:
                        'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                    fullName: user.fullName,
                }}
                createdAt={new Date(
                    onePost.createdAt.split('T')[0]
                ).toLocaleString('ru', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })}
                viewsCount={onePost.viewsCount}
                commentsCount={3}
                tags={onePost.tags}
                isFullPost
            >
                <p>{onePost.text}</p>
            </Post>
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: 'Вася Пупкин',
                            avatarUrl:
                                'https://mui.com/static/images/avatar/1.jpg',
                        },
                        text: 'Это тестовый комментарий 555555',
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
            >
                <Index />
            </CommentsBlock>
        </>
    );
};
