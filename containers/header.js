import {View, Text, useColorScheme} from 'react-native'
import Styles from '../styles/main'
import Colors from '../theme/colors'

export default Header = ({children, title = 'header'}) => {
  const isDarkMode = useColorScheme() === 'dark'
  return (
    <View style={Styles.sectionContainer}>
      <Text
        style={[
          Styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black
          }
        ]}>
        {title}
      </Text>
      <Text
        style={[
          Styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark
          }
        ]}>
        {children}
      </Text>
    </View>
  )
}
