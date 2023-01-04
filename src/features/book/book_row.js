import {View, useColorScheme, FlatList} from 'react-native'
import Book from './book'

export default BookRow = ({books, ids, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark'
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column'
      }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        horizontal={true}
        data={ids}
        keyExtractor={(_, index) => String(index)}
        renderItem={({item}) => {
          const book = books.find(book => book.id === item)
          return <Book key={book.id} {...book} navigation={navigation} />
        }}
      />
    </View>
  )
}
