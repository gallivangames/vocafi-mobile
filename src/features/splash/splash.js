import React, {useState, useEffect} from 'react'
import {ActivityIndicator, View, Image} from 'react-native'
import EncryptedStorage from 'react-native-encrypted-storage'
import {useDispatch} from 'react-redux'

import {login} from '../../slices/user'
import Styles from '../../styles/main'

export default SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(async () => {
      setAnimating(false)
      const creds = await EncryptedStorage.getItem('creds')

      // tODO add face / bio login
      // TODO if can't auto login, then go to auth
      // try to login
      if (creds) {
        const results = await dispatch(login(JSON.parse(creds)))

        if (
          results.payload &&
          results.payload.data &&
          results.payload.data.token
        ) {
          navigation.replace('DrawerNavigationRoutes')
        }
      } else {
        navigation.replace('Auth')
      }
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
