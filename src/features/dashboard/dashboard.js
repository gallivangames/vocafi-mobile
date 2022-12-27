import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {SafeAreaView, View, Text} from 'react-native'

import {getBooks} from '../../slices/book'

export default Dashboard = () => {
  const dispatch = useDispatch()
  const books = useSelector(state => state.book.books)
  console.debug('books: ', books)

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
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16
            }}>
            Example of Splash, Login and Sign Up in React Native
            {'\n\n'}
            This is the Home Screen
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          Splash, Login and Register Example{'\n'}React Native
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  )
}
