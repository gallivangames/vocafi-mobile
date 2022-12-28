import {View, Image, Text, useColorScheme, Pressable} from 'react-native'
import {useDispatch} from 'react-redux'

import {getBook} from '../slices/book'
import Styles from '../styles/main'
import Colors from '../theme/colors'

// TODO clicking on a book pops up a list of narrations to choose from
export default Book = ({title, cover, published_at, id}) => {
  const isDarkMode = useColorScheme() === 'dark'
  const dispatch = useDispatch()

  const findBook = () => {
    console.debug('getting book', id)
    dispatch(getBook(id))
    // show popup or go to another screen?
  }

  return (
    <View>
      <Pressable onPress={findBook}>
        <Image
          source={{
            uri: `https://www.vocafi.com/img/covers/${cover}`
          }}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'contain',
            margin: 5,
            borderRadius: 10
          }}
        />
        <Text style={{color: '#000'}}>title: {title}</Text>
      </Pressable>
    </View>
  )
}
