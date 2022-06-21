import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { auth } from "../../firebase.config"
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"


const initialState = {
  user: null
}

export const setUser = createAsyncThunk(
  'user/setUser',
  async () => {
    try {
      const provider = new GoogleAuthProvider()
      const response = await signInWithPopup(auth, provider)
      console.log(response.user)
      return response.user.providerData[0]
    } catch (error) {
      console.log('error logging in', error)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => {
    try {
      await signOut(auth)
      console.log('Successfully signed out')
    } catch (error) {
      console.log('error signing out', error)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
      })
  }
})

export const usersSliceActions = userSlice.actions

export default userSlice.reducer

export const selectUser = state => state.user.user