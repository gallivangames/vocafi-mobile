import {View, Text, Image} from 'react-native'
import Styles from '../../styles/main'
import Colors from '../../theme/colors'

export default Header = ({children}) => {
  return (
    <View style={Styles.header}>
      <Image source={require('../../assets/white_logo_100.png')} />
      <Text
        style={[
          Styles.sectionTitle,
          {
            color: Colors.black
          }
        ]}></Text>
    </View>
  )
}
