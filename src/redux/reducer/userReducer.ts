import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { userReducerInitialState } from '../../types/reducer-type';
import { User } from '../../types/types';

const initialState:userReducerInitialState = {
    user : null,
    loading :true,
};


export const userReducer  = createSlice ({
    name : "userReducer",
    initialState,
    reducers : {

    userExist : (state , action: PayloadAction<User>) => {
        state.loading =false;
        state.user = action.payload;
        console.log("logeed in")
    }
,
    userNOtExist : (state ) => {
        state.loading =false;
        state.user = null;
        console.log("  not logeed in")

    }

    }
})

export const {userExist , userNOtExist} = userReducer.actions;