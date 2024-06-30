
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
  };
  
const userSlice=createSlice(
    {
        name:"user",
        initialState,
        reducers:
        {
            signinStart:(state)=>{
                state.loading=true
            },
            signInSuccess:(state,action)=>{
                state.loading=false,
                state.currentUser=action.payload,
                state.error=null
             },
             signInFailure:(state,action)=>{
                state.error=action.payload,
                state.loading = false;
             }
        }

    }
)

export const {signinStart,signInSuccess,signInFailure}=userSlice.actions;
export default userSlice.reducer;