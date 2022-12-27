import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import UserService from '../services/user'

export const login = createAsyncThunk(
  'user/login',
  async ({email, password}) => {
    try {
      const response = await UserService.login(email, password)
      return response
    } catch (error) {
      console.error(error)
    }
  }
)

export const User = createSlice({
  name: 'user',
  initialState: {
    user: {},
    token: '',
    token_expiration: '',
    api_version: '0.0.0'
  },
  reducers: {
    // setUser: (state, action) => {
    //   console.debug('setting user', action.payload)
    //   state.value = action.payload
    // },
  },
  extraReducers: builder => {
    // builder.addCase(login.pending, state => {
    //   // state.statusByName[action.meta.arg] = 'pending'
    // })
    builder.addCase(login.fulfilled, (state, {payload}) => {
      // state.statusByName[action.meta.arg] = 'fulfilled'
      // state.dataByName[action.meta.arg] = payload
      if (payload && payload.data) {
        state.user = payload.data.user
        state.token = payload.data.token
        state.token_expiration = payload.data.token_expiration
        state.api_version = payload.data.api_version
      }
      // TODO save to encrypted storage?
    })
    // builder.addCase(login.rejected, (state, action) => {
    //   // state.statusByName[action.meta.arg] = 'rejected'
    // })
  }
})

export const {setUser} = User.actions
export default User.reducer

export const selectUserEmail = state => state.user.email
export const isLoggedIn = state => {
  return state.user.token && state.user.token_expiration > new Date().getTime()
}
