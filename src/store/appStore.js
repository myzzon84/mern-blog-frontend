import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export const appStore = create((set) => ({
        posts: null,
        setPosts: (posts) => set({ posts }),
        tags: null,
        setTags: (tags) => set({ tags }),
    })
);

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store', appStore);
}


