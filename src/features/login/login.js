import React, {useState, createRef, useEffect} from 'react'
import {
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {login, isLoggedIn} from '../../slices/user'
import Loader from '../../components/loader'

export default LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('jason@vocafi.com')
  const [userPassword, setUserPassword] = useState('password')
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState('')
  const dispatch = useDispatch()
  const passwordInputRef = createRef()
  const isloggedin = useSelector(isLoggedIn)

  useEffect(() => {
    if (isloggedin) navigation.replace('DrawerNavigationRoutes')
  }, [isloggedin])

  const handleSubmitPress = () => {
    setErrorText('')
    if (!userEmail) {
      alert('Missing Email')
      return
    }
    if (!userPassword) {
      alert('Missing Password')
      return
    }

    setLoading(true)
    const payload = {
      email: userEmail,
      password: userPassword
    }

    // todo debounce login
    dispatch(login(payload))
      .then(response => {
        if (response.payload && response.payload.data) {
          setLoading(false)
        } else {
          setLoading(false)
          setErrorText('Could not login at this time.')
        }
      })
      .catch(err => {
        console.error('error', err)
      })
  }

  return (
    <View style={Styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/white_logo_100.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30
                }}
              />
            </View>
            <View style={Styles.SectionStyle}>
              <TextInput
                style={Styles.inputStyle}
                onChangeText={userEmail => setUserEmail(userEmail)}
                placehodler="Enter Email"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={Styles.SectionStyle}>
              <TextInput
                style={Styles.inputStyle}
                onChangeText={userPassword => setUserPassword(userPassword)}
                placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errorText !== '' ? (
              <Text style={Styles.errorTextStyle}>{errorText}</Text>
            ) : null}
            <TouchableOpacity
              style={Styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={Styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={Styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              New Here? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  )
}
