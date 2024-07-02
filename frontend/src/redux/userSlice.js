
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
             },
             updateStart:(state)=>{
                state.loading=true
             },
             updateSuccess:(state,action)=>{
                state.loading=false,
                state.currentUser=action.payload,
                state.error=null
             },
             updateFailure:(state,action)=>{
                state.loading=false
                state.error=action.payload
             },
             deleteStart:(state)=>{
                state.loading=true
             },
             deleteSuccess:(state)=>{
              
                state.currentUser = null;
                state.loading = false;
                state.error = null;
          
             },
             deleteFailure:(state,action)=>{
                state.loading=false,
                state.error=action.payload
             },
             signOut:(state)=>{
                state.currentUser=null
             }


        }

    }
)

export const {signinStart,signInSuccess,signInFailure,updateStart,updateSuccess,updateFailure,deleteStart,deleteSuccess,deleteFailure,signOut}=userSlice.actions;
export default userSlice.reducer;