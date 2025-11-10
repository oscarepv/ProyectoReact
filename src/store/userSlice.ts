import { createSlice } from "@reduxjs/toolkit";
import type { UserInterface } from "../models";


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: true,
        isLocked: false,
        users: [] as UserInterface[],
        userEntity: null as UserInterface | null,
        disabledUser: null as UserInterface | null,
    },
    reducers: {
        onSetUser: ( state, { payload } ) => {
            state.disabledUser = payload;
        },
        onSetLockedUser: ( state, { payload } ) => {
            state.isLocked = payload;
        },
        onLoadUsers: (state, { payload }: { payload: UserInterface[] }) => {
            state.users = payload;
            state.isLoading = false;
        },
        onAddNewUser: ( state, { payload } ) => {
            state.users.push( payload );
        },
        onUpdateUser: ( state, { payload } ) => {
            state.users = state.users.map( user => {
                if ( user.id === payload.id ) {
                    return payload;
                }
                return user;
            });
        },
        onDeleteUser: ( state ) => {
            if ( state.disabledUser ) {
                state.users = state.users.filter( (user: UserInterface) => user.id !== state.disabledUser?.id );
                state.disabledUser = null;
            }
        },
    }
});

export const { 
    onLoadUsers,
    onAddNewUser, 
    onUpdateUser, 
    onDeleteUser,
    onSetUser,
    onSetLockedUser
} = userSlice.actions;