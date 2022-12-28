// this contains a list of books all in the same "group"
// this can be genre, new books, recommended books, already lsitened, trending, and so on

import {View, Image, Text, useColorScheme} from 'react-native'
import Book from './book'
import Styles from '../styles/main'
import Colors from '../theme/colors'

// TODO clicking on a book pops up a list of narrations to choose from
export default BookRow = ({title, books}) => {
  const isDarkMode = useColorScheme() === 'dark'
  return (
    <View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Text style={{color: '#000'}}>title: {title}</Text>
        {books.map(book => {
          return <Book key={book.id} {...book} />
        })}
      </View>
    </View>
  )
}
