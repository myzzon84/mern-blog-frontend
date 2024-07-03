import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';

import { Link } from 'react-router-dom';

import { removePost, getAllPosts } from '../../requests/requests.js';
import { appStore } from '../../store/appStore.js';
import { toast } from 'react-toastify';

export const Post = ({
    id,
    title,
    createdAt,
    imageUrl,
    user,
    viewsCount,
    commentsCount,
    tags,
    children,
    isFullPost,
    isLoading,
    isEditable,
}) => {
    

    const setPosts = appStore((state) => state.setPosts);
    const posts = appStore((state) => state.posts);

    let post = posts?.filter((item) => {
        return item._id === id
    })

    const onClickRemove = () => {
        removePost(id)
            .then(() => {
                let newPosts = JSON.parse(JSON.stringify(posts));
                let index;
                newPosts.forEach((element, i) => {
                    if (element._id === id) {
                        index = i;
                        return;
                    }
                });
                console.log(index);
                newPosts.splice(index, 1);
                setPosts(newPosts);
            })
            .catch(err => {
                toast('Error remove post');
                console.log(err);
            })
    };

    console.log(imageUrl);

    if (isLoading) {
        return <PostSkeleton />;
    }

    console.log(user);

    return (
        <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
            {isEditable && (
                <div className={styles.editButtons}>
                    <Link to={`/posts/${id}/edit`}>
                        <IconButton color='primary'>
                            <EditIcon />
                        </IconButton>
                    </Link>
                    <IconButton
                        onClick={onClickRemove}
                        color='secondary'
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
            {imageUrl && (
                <img
                    className={clsx(styles.image, {
                        [styles.imageFull]: isFullPost,
                    })}
                    src={`http://localhost:4444${imageUrl}`}
                    alt={title}
                />
            )}
            <div className={styles.wrapper}>
                <UserInfo
                    {...user}
                    additionalText={createdAt}
                />
                <div className={styles.indention}>
                    <h2
                        className={clsx(styles.title, {
                            [styles.titleFull]: isFullPost,
                        })}
                    >
                        {isFullPost ? (
                            title
                        ) : (
                            <Link to={`/posts/${id}`}>{title}</Link>
                        )}
                    </h2>
                    <ul className={styles.tags}>
                        {tags
                            ? tags.map((name) => (
                                  <li key={name}>
                                      <Link to={`/tag/${name}`}>#{name}</Link>
                                  </li>
                              ))
                            : null}
                    </ul>
                    {children && (
                        <div className={styles.content}>{children}</div>
                    )}
                    <ul className={styles.postDetails}>
                        <li>
                            <EyeIcon />
                            <span>{viewsCount}</span>
                        </li>
                        <li>
                            <CommentIcon />
                            <span>{commentsCount}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
