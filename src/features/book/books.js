import {useEffect, useState} from 'react'
import {
  View,
  Image,
  Text,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Button
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import TrackPlayer, {
  useProgress,
  useTrackPlayerEvents,
  Event
} from 'react-native-track-player'

import {setupPlayer, addTracks} from '../player/player'

import {getBook} from '../../slices/book'
import Narrations from './narrations'

import {appContainer, content, header, headerTitle} from '../player/styles'
import {sendUserActivity} from '../../slices/user'

const API_URL = 'http://127.0.0.1:8000'
const COVER_URL = 'https://www.vocafi.com/img/covers/'

const events = [Event.PlaybackState, Event.PlaybackError]

export default Book = ({
  navigation,
  route: {
    params: {id}
  }
}) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch()
  const book = useSelector(state =>
    state.book.books.find(book => book.id === id)
  )
  const [narration, setNarration] = useState({})
  // const progress = useProgress() TODO use this for the 'progress bar'

  useTrackPlayerEvents(events, event => {
    // TODO these will mot work when app is closed
    // console.debug('user event: ', event)
    // if (event.type === Event.PlaybackError) {
    //   alert('an error occured, please try again later.')
    // }
    // if (event.type === Event.PlaybackState) {
    //   console.debug('whatever this state it', event.state)
    //   if (event.state === 'playing') {
    //   }
    // }
  })

  useEffect(() => {
    const setup = async () => {
      let isSetup = await setupPlayer()
      setIsPlayerReady(isSetup)
    }
    setup()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      title: book.title
    })

    dispatch(getBook(id))
  }, [id])

  const handleReset = () => {
    TrackPlayer.reset()
    setTracks([])
  }

  const handleSelect = async newNarration => {
    if (newNarration.id !== narration.id) {
      const nar = book.narrations.book.narrations.find(
        n => n.id === newNarration.id
      )
      setNarration(nar)

      const tracks = book.narrations.book.advertisements.map(ad => ({
        id: newNarration.id,
        advertisement_id: ad.id,
        url: `${API_URL}/audio/ads?id=${ad.id}&token=${token}`,
        title: ad.advertiser.company,
        artist: '',
        artwork: '',
        album: '',
        duration: ad.length,
        action: ad.action,
        book_id: id
      }))

      tracks.push({
        id: newNarration.id,
        url: `${API_URL}/audio?id=${newNarration.id}&token=${token}`,
        title: newNarration.narrator.name,
        artist: '',
        artwork: '',
        album: '',
        duration: newNarration.length,
        book_id: id,
        book_mark: newNarration.book_mark
      })

      TrackPlayer.reset()

      await addTracks(tracks)

      handleActivity('audio setup')

      TrackPlayer.play()
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

  const handleActivity = async action => {
    const index = await TrackPlayer.getCurrentTrack()
    const track = await TrackPlayer.getTrack(index)
    const payload = {
      advertisement_id: track.advertisement_id,
      narration_id: track.id,
      action,
      book_id: id,
      source: 'app'
    }

    dispatch(sendUserActivity(payload))
  }

  if (!book) return <View />

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={appContainer}>
        <ActivityIndicator size="large" color="#bbb" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView>
      <Image
        source={{
          uri: `${COVER_URL}${book.cover}`
        }}
        style={{
          width: 150,
          height: 150,
          resizeMode: 'contain',
          margin: 5,
          borderRadius: 10
        }}
      />
      <Text style={{color: '#000'}}>title: {book.title}</Text>
      <Text style={{color: '#000'}}>authors: {book.author.name}</Text>
      <Text style={{color: '#000'}}>published_at: {book.published_at}</Text>
      <View style={header}>
        <Text style={headerTitle}>Select a narration from below</Text>
      </View>
      <Narrations
        narrations={book.narrations}
        handleSelect={handleSelect}
        selected={narration && narration.id}
      />

      <StatusBar backgroundColor={'#35427e'} />

      <View style={content}>
        <Button title="Play" color="#777" onPress={handleUserPlay} />
        <Button title="Pause" color="#777" onPress={handleUserPause} />
        <Button title="reset" color="#777" onPress={handleReset} />
      </View>
    </SafeAreaView>
  )
}
