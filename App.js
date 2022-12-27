import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import SplashScreen from './src/features/splash/splash'
import LoginScreen from './src/features/login/login'
// import RegisterScreen from './screens/register'
import DrawerNavigationRoutes from './src/navigation/drawer_routes'

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
  return (
    <NavigationContainer>
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
