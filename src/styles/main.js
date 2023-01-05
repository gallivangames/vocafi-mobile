import {StyleSheet} from 'react-native'
import Colors from '../theme/colors'

export default Styles = StyleSheet.create({
  activityIndicator: {
    alignItems: 'center',
    height: 80
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14
  },
  headerTitle: {
    backgroundColor: Colors.black,
    color: '#ffffff',
    fontSize: 22,
    margin: 7
  },
  headerTitlePublished: {
    backgroundColor: Colors.black,
    color: '#ffffff',
    fontSize: 12,
    margin: 9
  },
  highlight: {
    fontWeight: '700'
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8'
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
    alignContent: 'center'
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10
  },
  sectionContainer: {
    marginTop: 5,
    paddingHorizontal: 5
  },

  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    margin: 5
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  synopsis: {
    margin: 3,
    padding: 9,
    color: '#ffffff',
    fontSize: 18
  }
})
