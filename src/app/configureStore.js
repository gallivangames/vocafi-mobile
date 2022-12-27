import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../slices/user'
import bookReducer from '../slices/book'

export default configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: true
})
