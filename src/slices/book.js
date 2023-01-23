import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit'
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
    builder.addCase('UPDATE_BOOKMARK', (state, {payload}) => {
      const books = state.books.map(book => {
        if (book.id === payload.payload.book_id) {
          book.narrations.book.narrations = book.narrations.book.narrations.map(
            narration => {
              if (narration.id === payload.payload.narration_id) {
                narration.book_mark = payload.payload.current_time
              }
              return narration
            }
          )
        }
        return book
      })
      state.books = books
    })
  }
})

export const updateBookmark = createAction('UPDATE_BOOKMARK')

export default Book.reducer
