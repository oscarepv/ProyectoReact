import { createSlice } from "@reduxjs/toolkit";
import type { PostInterface} from "../models";


export const postSlice = createSlice({
    name: 'post',
    initialState: {
        isLoading: true,
        isLocked: false,
        posts: [] as PostInterface[],
        postEntity: null as PostInterface | null,
        disabledPost: null as PostInterface | null,
    },
    reducers: {
        onSetPost: ( state, { payload } ) => {
            state.disabledPost = payload;
        },
        onSetLockedPost: ( state, { payload } ) => {
            state.isLocked = payload;
        },
        onLoadPosts: (state, { payload }: { payload: PostInterface[] }) => {
            state.posts = payload;
            state.isLoading = false;
        },
        onAddNewPost: ( state, { payload } ) => {
            state.posts.push( payload );
        },
        onUpdatePost: ( state, { payload } ) => {
            state.posts = state.posts.map( post => {
                if ( post.id === payload.id ) {
                    return payload;
                }
                return post;
            });
        },
        onDeletePost: ( state ) => {
            if ( state.disabledPost ) {
                state.posts = state.posts.filter( (post: PostInterface) => post.id !== state.disabledPost?.id );
                state.disabledPost = null;
            }
        },
    }
});

export const { 
    onLoadPosts,
    onAddNewPost, 
    onUpdatePost, 
    onDeletePost,
    onSetPost,
    onSetLockedPost
} = postSlice.actions;