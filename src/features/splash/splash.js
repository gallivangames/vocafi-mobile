import React, {useState, useEffect} from 'react'
import {ActivityIndicator, View, Image} from 'react-native'
import EncryptedStorage from 'react-native-encrypted-storage'

import Styles from '../../styles/main'

export default SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false)
      EncryptedStorage.getItem('token_expiration').then(value =>
        // TODO if expired, try to log in automaticcaly with credentials taht are saved in encryptedstorage
        // tODO add face / bio login
        // TODO refreshing token should update the expiration

        navigation.replace(
          value == null || value < new Date().getTime()
            ? 'Auth'
            : 'DrawerNavigationRoutes'
        )
      )
    }, 5000)
  }, [])

  return (
    <View style={Styles.container}>
      <Image
        source={require('../../assets/white_logo_100.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#ffffff"
        size="large"
        style={Styles.activityIndicator}
      />
    </View>
  )
}
