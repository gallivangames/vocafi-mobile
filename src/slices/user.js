import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit'
import EncryptedStorage from 'react-native-encrypted-storage'
import jwtDecode from 'jwt-decode'

import UserService from '../services/user'

export const login = createAsyncThunk(
  'user/login',
  async ({email, password}) => {
    try {
      const response = await UserService.login(email, password)

      const raw_refresh = response.request.responseHeaders['Set-Cookie']
      const refresh = raw_refresh.substring(14, raw_refresh.indexOf(';'))

      EncryptedStorage.setItem('rft', refresh)
      EncryptedStorage.setItem('creds', JSON.stringify({email, password}))

      return response
    } catch (error) {
      console.error(error)
    }
  }
)

export const refresh = createAsyncThunk(
  'user/refresh',
  async (_, {rejectWithValue}) => {
    try {
      const rft = await EncryptedStorage.getItem('rft')
      if (!rft) {
        rejectWithValue('no refresh token')
      }
      const response = await UserService.refresh(rft)
      console.debug('sending back the refreshed response')
      return response
    } catch (error) {
      console.error(error)
    }
  }
)

const initialState = {
  user: {},
  token: '',
  api_version: '0.0.0'
}
export const User = createSlice({
  name: 'user',
  initialState,
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
    builder.addCase(revertAll, () => initialState)
    builder.addCase(refresh.fulfilled, (state, {payload}) => {
      console.debug('payload', payload.data)
      if (payload && payload.data) {
        state.token = payload.data.access_token
      }
    })
    builder.addCase(login.fulfilled, (state, {payload}) => {
      // state.statusByName[action.meta.arg] = 'fulfilled'
      // state.dataByName[action.meta.arg] = payload
      console.debug('logging in', payload.data)
      if (payload && payload.data) {
        state.user = payload.data.user
        state.token = payload.data.token
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
  if (!state.user || !state.user.token) return false
  const decoded = jwtDecode(state.user.token)
  return decoded.exp * 1000 > new Date().getTime()
}

export const revertAll = createAction('REVERT_ALL')
