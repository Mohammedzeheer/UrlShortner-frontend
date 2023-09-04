import {createSlice} from '@reduxjs/toolkit'

const INITIAL_STATE={ 
    email:'',
    username:"",
}

export const UserSlice=createSlice({
    name:'user',
    initialState:INITIAL_STATE,
    reducers:{
        updateUser:(state,action)=>{
            state.email=action.payload.email     
            state.username = action.payload.username      
        }, 
        logoutUser: (state) => {
            Object.assign(state, INITIAL_STATE);
        }
    }
})

export const {updateUser,logoutUser} =UserSlice.actions
export default UserSlice.reducer