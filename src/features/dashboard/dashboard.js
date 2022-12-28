import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {SafeAreaView, View, Text} from 'react-native'

import {getBooks} from '../../slices/book'
import BookRow from '../../components/book_row'

export default Dashboard = () => {
  const dispatch = useDispatch()
  const books = useSelector(state => state.book.books)

  // get books
  // create book item
  // call api and get the list of books
  // show the list of books

  useEffect(() => {
    dispatch(getBooks())
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        {/* multiple book rows here */}
        <BookRow books={books} title={'New'} />
        <BookRow books={books} title={'Fantasy'} />
        <BookRow books={books} title={'Continue'} />
        <BookRow books={books} title={'Recommended'} />
        <BookRow books={books} title={'Trending'} />
      </View>
    </SafeAreaView>
  )
}
