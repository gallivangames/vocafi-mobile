import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {useDispatch, useSelector} from 'react-redux'
import jwtDecode from 'jwt-decode'
import EncryptedStorage from 'react-native-encrypted-storage'

import SplashScreen from './src/features/splash/splash'
import LoginScreen from './src/features/login/login'
import BookScreen from './src/features/book/books'
import DrawerNavigationRoutes from './src/navigation/drawer_routes'
import {refresh, login} from './src/slices/user'

const Stack = createStackNavigator()

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{title: 'Register', headerStyle: {backgroundColor: '#307ecc',}, headerTintColor: '#fff', headerTitleStyle: {fontWeigth: 'bold'}}} /> */}
    </Stack.Navigator>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const authVerify = async () => {
    if (user) {
      try {
        if (user.token) {
          const token = jwtDecode(user.token)
          if (token) {
            if (user.user.id !== token.user.id) {
              // error and log out
            } else {
              if (token.exp * 1000 <= new Date().getTime()) {
                try {
                  await dispatch(refresh())
                } catch (err) {
                  const creds = await EncryptedStorage.getItem('creds')

                  if (creds) {
                    const results = await dispatch(login(JSON.parse(creds)))
                  } else {
                    // todo redirect to login
                  }
                }
              }
            }
          }
        } else {
          // there is no token, you should be sent to login
          // tODO redirect to login
        }
      } catch (err) {
        console.log(err)
        // TODO redirect to login
      }
    }
  }

  return (
    <NavigationContainer onStateChange={authVerify}>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookScreen"
          component={BookScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#000000'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App
