import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'
import {Provider} from 'react-redux'
import TrackPlayer from 'react-native-track-player'

import {playbackService} from './src/features/player/player'
import store from './src/app/configureStore'

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => Root)
TrackPlayer.registerPlaybackService(() => playbackService)
