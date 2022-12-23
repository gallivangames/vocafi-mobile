import {View, Text, Image, useColorScheme} from 'react-native'
import Styles from '../styles/main'
import Colors from '../theme/colors'

export default Header = ({children}) => {
  const isDarkMode = useColorScheme() === 'dark'
  return (
    <View style={Styles.header}>
      <Image source={require('../assets/white_logo_100.png')} />
      <Text
        style={[
          Styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black
          }
        ]}></Text>
    </View>
  )
}
