// import {useState, useEffect} from 'react'
// import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
// import TrackPlayer, {
//   useTrackPlayerEvents,
//   Event,
//   State
// } from 'react-native-track-player'

// import {addTracks} from './player'

// export default Playlist = ({tracks}) => {
//   const [queue, setQueue] = useState([])
//   const [currentTrack, setCurrentTrack] = useState(0)

//   async function loadPlaylist() {
//     const queue = await TrackPlayer.getQueue()
//     setQueue(queue)
//   }

//   useEffect(() => {
//     loadPlaylist()
//   }, [])

//   useEffect(() => {
//     const add = async () => {
//       await addTracks(tracks)
//       const q = await TrackPlayer.getQueue()
//       setQueue(q)
//       // TrackPlayer.play()
//       alert('playing narration')
//     }
//     add()
//   }, [tracks])

//   useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
//     if (event.state == State.nextTrack) {
//       let index = await TrackPlayer.getCurrentTrack()
//       setCurrentTrack(index)
//     }
//   })

//   const PlaylistItem = ({index, title, isCurrent}) => {
//     function handleItemPress() {
//       TrackPlayer.skip(index)
//     }

//     return (
//       <TouchableOpacity onPress={handleItemPress}>
//         <Text
//           style={{
//             ...styles.playlistItem,
//             ...{backgroundColor: isCurrent ? '#666' : 'transparent'}
//           }}>
//           {title}
//         </Text>
//       </TouchableOpacity>
//     )
//   }

//   return (
//     <View>
//       <View style={styles.playlist}>
//         <FlatList
//           data={queue}
//           renderItem={({item, index}) => (
//             <PlaylistItem
//               index={index}
//               title={item.title}
//               isCurrent={currentTrack == index}
//             />
//           )}
//         />
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   playlist: {
//     marginTop: 40,
//     marginBottom: 40
//   },
//   playlistItem: {
//     fontSize: 16,
//     paddingTop: 4,
//     paddingBottom: 4,
//     paddingLeft: 8,
//     paddingRight: 8,
//     borderRadius: 4
//   }
// })
