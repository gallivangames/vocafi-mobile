import {useState} from 'react'
import {View} from 'react-native'
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  usePlaybackState,
  State
} from 'react-native-track-player'
import {useDispatch, useSelector} from 'react-redux'

import {sendUserActivity} from '../../slices/user'
import {addTracks} from '../player/player'
import Narration from './narration'

const API_URL = 'http://127.0.0.1:8000'
const events = [Event.PlaybackState, Event.PlaybackError]

export default Narrations = ({narrations, advertisements, book_id}) => {
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch()
  const playerState = usePlaybackState()
  const isPlaying = playerState === State.Playing

  const [selected, setSelected] = useState('')
  const [isAd, setIsAd] = useState(true)

  const handleActivity = async action => {
    const index = await TrackPlayer.getCurrentTrack()
    const track = await TrackPlayer.getTrack(index)

    const payload = {
      advertisement_id: track.advertisement_id,
      narration_id: track.id,
      action,
      book_id,
      source: 'app'
    }

    dispatch(sendUserActivity(payload))
  }

  const handleSelect = async newNarration => {
    if (newNarration.id !== selected) {
      setSelected(newNarration.id)

      const tracks = advertisements.map(ad => ({
        id: newNarration.id,
        advertisement_id: ad.id,
        url: `${API_URL}/audio/ads?id=${ad.id}&token=${token}`,
        title: ad.advertiser.company,
        artist: '',
        artwork: '',
        album: '',
        duration: ad.length,
        action: ad.action,
        book_id: book_id
      }))

      tracks.push({
        id: newNarration.id,
        url: `${API_URL}/audio?id=${newNarration.id}&token=${token}`,
        title: newNarration.narrator.name,
        artist: '',
        artwork: '',
        album: '',
        duration: newNarration.length,
        book_id,
        book_mark: newNarration.book_mark
      })

      TrackPlayer.reset()

      await addTracks(tracks)

      handleActivity('audio setup')

      TrackPlayer.play()
    }
  }

  useTrackPlayerEvents(events, async event => {
    // TODO these will mot work when app is closed
    if (event.type === Event.PlaybackError) {
      alert('an error occured, please try again later.')
    }
    if (event.type === Event.PlaybackState) {
      if (event.state === State.Playing) {
        const index = await TrackPlayer.getCurrentTrack()
        const track = await TrackPlayer.getTrack(index)
        if (track.advertisement_id) {
          setIsAd(true)
        } else {
          setIsAd(false)
        }
      }
    }
  })

  const playNarration = async narration => {
    if (selected) {
      if (!isAd) {
        if (isPlaying) {
          handleUserPause()
        } else {
          handleUserPlay()
        }
      }
    } else {
      handleSelect(narration)
    }
  }

  const handleUserPause = async () => {
    const index = await TrackPlayer.getCurrentTrack()
    const track = await TrackPlayer.getTrack(index)
    if (!track.advertisement_id) {
      const state = await TrackPlayer.getState()
      if (state === 'playing') {
        handleActivity('user pause')
        TrackPlayer.pause()
      }
    }
  }

  const handleUserPlay = async () => {
    const state = await TrackPlayer.getState()
    if (state === 'paused') {
      handleActivity('user play')
      TrackPlayer.play()
    }
  }

  if (!narrations) return <View />

  return (
    <View>
      {narrations.map(narration => (
        <Narration
          key={narration.id}
          narration={narration}
          playNarration={playNarration}
          isAd={isAd}
          selected={selected}
        />
      ))}
    </View>
  )
}
