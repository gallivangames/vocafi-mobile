import React, {useEffect, useState} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {useSelector} from 'react-redux'

import Dashboard from '../features/dashboard/dashboard'
import SidebarMenu from '../features/sidebar_menu/sidebar_menu'
import NavigationDrawerHeader from '../features/navigation/navigation_drawer_header'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const HomeScreenStack = ({navigation}) => {
  const [title, setTitle] = useState('Home')
  const version = useSelector(state => state.user.api_version)

  console.debug('the version', version)

  useEffect(() => {
    if (version && __DEV__) setTitle(`Home - ${version}`)
  }, [version])

  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: title,
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {backgroundColor: '#307ecc'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'}
        }}
      />
    </Stack.Navigator>
  )
}

// const AccountScreenStack = ({navigation}) => {
//   return (
//     <Stack.Navigator
//       initialRouteName="AccountScreen"
//       screenOptions={{
//         headerLeft: () => (
//           <NavigationDrawerHeader navigationProps={navigation} />
//         ),
//         headerStyle: {backgroundColor: '#307ecc'},
//         headerTintColor: '#fff',
//         headerTitleStyle: {fontWeight: 'bold'}
//       }}>
//       <Stack.Screen
//         name="AccountScreen"
//         component={Account}
//         options={{title: 'Settings'}}
//       />
//     </Stack.Navigator>
//   )
// }

const DrawerNavigatorRoutes = props => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {color: '#d8d8d8'}
      }}
      drawerContent={SidebarMenu}>
      <Drawer.Screen
        name="homeScreenStack"
        options={{drawerLabel: 'Home Screen'}}
        component={HomeScreenStack}
      />
      {/* <Drawer.Screen
        name="accountScreenStack"
        options={{drawerLabel: 'Account Screen'}}
        component={AccountScreenStack}
      /> */}
    </Drawer.Navigator>
  )
}

export default DrawerNavigatorRoutes
