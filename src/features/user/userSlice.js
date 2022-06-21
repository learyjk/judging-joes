import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { auth } from "../../firebase.config"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"


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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.user = action.payload;
    })
  }
})

export const usersSliceActions = userSlice.actions

export default userSlice.reducer

export const selectUser = state => state.user.user