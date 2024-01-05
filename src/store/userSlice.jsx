import { createSlice } from "@reduxjs/toolkit";
const userSlice=createSlice({
    name:'user',
    initialState:{
        ActiveUser:[],
    },
    reducers:{
        addUser:(state,action)=>{
            state.ActiveUser.push(action.payload);
        },
        removeUser:(state,action)=>{ 
            state.ActiveUser.length=0;
        }
        
    },
});
export const {addUser,removeUser}= userSlice.actions;
export default userSlice.reducer;