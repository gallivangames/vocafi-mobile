import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {useDispatch, useSelector} from 'react-redux'
import jwtDecode from 'jwt-decode'

import SplashScreen from './src/features/splash/splash'
import LoginScreen from './src/features/login/login'
import DrawerNavigationRoutes from './src/navigation/drawer_routes'
import {refresh} from './src/slices/user'

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
    // TODO this may still need work to send query AFTER the refresh happens.

    // if no user - we dont' have to do anything, it will log them out anyway
    if (user) {
      // if user then check expiration

      try {
        if (user.token) {
          const token = jwtDecode(user.token)

          if (token) {
            // check the userid's match
            if (user.user.id !== token.user.id) {
              // error and log out
            } else {
              if (token.exp * 1000 <= new Date().getTime()) {
                // it's expired so try to refresh
                await dispatch(refresh())
              }
            }
          }
        } else {
          // there is no token, you should be sent to login
        }
      } catch (err) {
        console.debug('invalid token')
        console.log(err)
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
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App
