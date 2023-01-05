import React from 'react'
import {View, Text, Alert, StyleSheet, Image} from 'react-native'
import {useDispatch} from 'react-redux'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer'
import EncryptedStorage from 'react-native-encrypted-storage'

import {revertAll} from '../../slices/user'

const SidebarMenu = props => {
  const dispatch = useDispatch()
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <Image
          source={require('../../assets/white_logo_100.png')}
          style={{
            width: '50%',
            height: 30,
            resizeMode: 'contain',
            margin: 3
          }}
        />
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({color}) => <Text style={{color: '#d8d8d8'}}>Logout</Text>}
          onPress={() => {
            props.navigation.toggleDrawer()
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null
                  }
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    EncryptedStorage.clear()
                    dispatch(revertAll())
                    // TODO clear the state as well
                    props.navigation.replace('Auth')
                  }
                }
              ],
              {cancelable: false}
            )
          }}
        />
      </DrawerContentScrollView>
    </View>
  )
}

export default SidebarMenu

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    paddingTop: 40,
    color: 'white'
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    padding: 3,
    textAlign: 'center'
  }
})
