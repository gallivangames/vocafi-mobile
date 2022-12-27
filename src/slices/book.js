import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getBooks as findBooks} from '../services/book'

export const getBooks = createAsyncThunk(
  'book/getAll',
  async (arg, {getState}) => {
    try {
      const state = getState()
      const response = await findBooks(state.user.token)
      return response
    } catch (error) {
      console.error(error)
    }
  }
)

export const Book = createSlice({
  name: 'book',
  initialState: {
    books: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getBooks.fulfilled, (state, {payload}) => {
      if (payload && payload.data) {
        state.books = payload.data.books
      }
    })
  }
})

export default Book.reducer
