import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit'
import EncryptedStorage from 'react-native-encrypted-storage'
import jwtDecode from 'jwt-decode'

import store from '../app/configureStore'
import UserService from '../services/user'
import {recordActivity} from '../services/app'
import {updateBookmark} from './book'

export const sendUserActivity = createAsyncThunk(
  'activity',
  async (payload, {getState}) => {
    try {
      const state = await getState()
      return await recordActivity(payload, state.user.token)
    } catch (error) {
      console.error(error)
    }
  }
)

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
      return await UserService.refresh(rft)
    } catch (error) {
      console.error(error)
    }
  }
)

const initialState = {
  user: {},
  token: '',
  api_version: '0.0.0',
  current_narration: {}
}
export const User = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(revertAll, () => initialState)
    builder.addCase(setCurrentNarration, (state, {payload}) => {
      // TODO setting current Narration but i don't think this is actually used
      // TODO but if we can retrieve the current narration then maybe we can reset it?
      state.current_narration = payload
    })
    builder.addCase(refresh.fulfilled, (state, {payload}) => {
      if (payload && payload.data) {
        state.token = payload.data.access_token
      }
    })
    builder.addCase(login.fulfilled, (state, {payload}) => {
      if (payload && payload.data) {
        state.user = payload.data.user
        state.token = payload.data.token
        state.api_version = payload.data.api_version
      }
    })
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
export const setCurrentNarration = createAction('SET_CURRENT_NARRATION')

export const sendUserAction = payload => {
  if (payload.action === 'update bookmark') {
    const state = store.getState()
    store.dispatch(updateBookmark({payload}))
    if (state.user.current_narration.id) {
      if (
        state.user.current_narration.last_recorded_time > payload.current_time
      ) {
        store.dispatch(
          setCurrentNarration({
            id: payload.narration_id,
            last_recorded_time: payload.current_time
          })
        )
        store.dispatch(sendUserActivity(payload))
      } else {
        if (
          state.user.current_narration.last_recorded_time + 10 <=
          payload.current_time
        ) {
          store.dispatch(
            setCurrentNarration({
              id: payload.narration_id,
              last_recorded_time: payload.current_time
            })
          )
          store.dispatch(sendUserActivity(payload))
        }
      }
    } else {
      store.dispatch(
        setCurrentNarration({
          id: payload.narration_id,
          last_recorded_time: payload.current_time
        })
      )
      store.dispatch(sendUserActivity(payload))
    }
  } else {
    store.dispatch(sendUserActivity(payload))
  }
}
