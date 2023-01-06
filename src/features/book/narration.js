import {useState, useEffect, useMemo} from 'react'
import {View, Text, Pressable, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import TrackPlayer, {
  usePlaybackState,
  State,
  useProgress
} from 'react-native-track-player'
import Slider from '@ptomasroos/react-native-multi-slider'

import Styles from '../../styles/main'
import {formatTime} from '../../utils/helpers'

export default Narration = ({narration, playNarration, isAd, selected}) => {
  const progress = useProgress()
  const [position, setPosition] = useState(narration.book_mark || 0)
  const playerState = usePlaybackState()
  const isPlaying = playerState === State.Playing
  const isLoading =
    playerState === State.Buffering ||
    playerState === State.Connecting ||
    playerState === State.Ready

  const handleSlider = e => {
    setPosition(e[0])
    TrackPlayer.seekTo(e[0])
  }

  useEffect(() => {
    if (!isAd && isPlaying) {
      setPosition(progress.position)
    }
  }, [progress])

  const showPlay = useMemo(
    () =>
      selected === '' ||
      (selected === narration.id && !isPlaying && !isLoading) ||
      (selected !== '' && selected !== narration.id),
    [selected, narration.id, isPlaying, isLoading]
  )

  return (
    <View style={{alignItems: 'center'}}>
      <Pressable key={narration.id} onPress={() => playNarration(narration)}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          {showPlay && (
            <Icon
              name="play"
              size={20}
              color="#ffffff"
              style={{marginRight: 15}}
            />
          )}
          {!isAd && selected === narration.id && isPlaying && (
            <Icon
              name="pause"
              size={20}
              color="#ffffff"
              style={{marginRight: 15}}
            />
          )}
          {isAd && selected === narration.id && isPlaying && (
            <Icon
              name="pause"
              size={20}
              color="#ee1111"
              style={{marginRight: 15}}
            />
          )}
          {selected === narration.id && isLoading && (
            <ActivityIndicator
              animating={true}
              color="#ffffff"
              size="small"
              style={Styles.activityIndicator}
            />
          )}

          <Text style={{...Styles.headerTitle, fontSize: 19}}>
            {narration.narrator.name}{' '}
            <Text style={{fontSize: 10}}>{formatTime(narration.length)}</Text>
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          {isAd && isPlaying && selected === narration.id && (
            <Text style={{...Styles.headerTitlePublished, color: '#ee1111'}}>
              Sponsor message...
              {formatTime(progress.duration - progress.position)}
            </Text>
          )}
        </View>
      </Pressable>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        <Text style={{...Styles.headerTitle, fontSize: 15, marginRight: 20}}>
          {formatTime(position)}
        </Text>
        <Slider
          enabledOne={!isAd && selected && isPlaying}
          values={[position]}
          min={0}
          max={narration.length}
          onValuesChange={handleSlider}
          sliderLength={200}
        />
        <Text style={{...Styles.headerTitle, fontSize: 15, marginLeft: 20}}>
          {formatTime(narration.length)}
        </Text>
      </View>
    </View>
  )
}
