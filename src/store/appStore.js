import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export const appStore = create((set) => ({
        posts: null,
        setPosts: (posts) => set({ posts }),
        tags: null,
        setTags: (tags) => set({ tags }),
        onePost: null,
        setOnePost: (post) => set({onePost: post}),
        user: null,
        setUser: (user) => set({user}),
        isAuth: false,
        setIsAuth: (bool) => set({isAuth: bool}),
    })
);

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store', appStore);
}


