import {View, Image, Pressable} from 'react-native'

const COVER_URL = 'https://www.vocafi.com/img/covers/'

export default Book = ({cover, id, navigation}) => {
  const goToBook = () => {
    navigation.navigate('BookScreen', {id})
  }

  return (
    <View>
      <Pressable onPress={goToBook}>
        <Image
          source={{
            uri: `${COVER_URL}${cover}`
          }}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'contain',
            margin: 5,
            borderRadius: 10
          }}
        />
      </Pressable>
    </View>
  )
}
