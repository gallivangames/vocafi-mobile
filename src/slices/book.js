import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getBooks as findBooks, getBook as findBook} from '../services/book'
import {revertAll} from './user'

export const getBooks = createAsyncThunk(
  'book/getAll',
  async (_, {getState}) => {
    try {
      const state = getState()
      const response = await findBooks(state.user.token)
      return response
    } catch (error) {
      console.error(error)
    }
  }
)

export const getBook = createAsyncThunk('book/get', async (id, {getState}) => {
  try {
    const state = getState()
    const book = state.book.books.find(book => book.id === id)
    if (book && book.narrations) {
      return book.narrations
    }
    return await findBook(id, state.user.token)
  } catch (error) {
    console.error(error)
  }
})

const initialState = {
  books: []
}
export const Book = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(revertAll, () => initialState)
    builder.addCase(getBook.fulfilled, (state, {payload}) => {
      if (payload && payload.data) {
        const book = state.books.find(book => book.id === payload.data.book.id)
        book.narrations = payload.data
      }
    })
    builder.addCase(getBooks.fulfilled, (state, {payload}) => {
      if (payload && payload.data) {
        state.books = payload.data.books
        state.sections = payload.data.sections
      }
    })
  }
})

export default Book.reducer
