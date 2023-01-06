import {useEffect, useState} from 'react'
import {View, Image, Text, SafeAreaView, ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import TrackPlayer from 'react-native-track-player'

import {setupPlayer} from '../player/player'
import {getBook} from '../../slices/book'
import Narrations from './narrations'
import Style from '../../styles/main'

const COVER_URL = 'https://www.vocafi.com/img/covers/'

export default Book = ({
  navigation,
  route: {
    params: {id}
  }
}) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const dispatch = useDispatch()
  const book = useSelector(state =>
    state.book.books.find(book => book.id === id)
  )

  useEffect(() => {
    const setup = async () => {
      let isSetup = await setupPlayer()
      setIsPlayerReady(isSetup)
    }
    setup()

    return () => {
      //TODO we don't want to shut it off when lost - we want to keep playing but we need to reload on remount
      if (TrackPlayer) TrackPlayer.reset()
    }
  }, [])

  useEffect(() => {
    navigation.setOptions({
      title: book.title
    })

    dispatch(getBook(id))
  }, [id])

  if (!book) return <View style={Style.container} />

  if (!isPlayerReady || !book.narrations) {
    return (
      <SafeAreaView style={Style.container}>
        <ActivityIndicator
          animating={true}
          color="#ffffff"
          size="large"
          style={Styles.activityIndicator}
        />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={Style.container}>
      <Image
        source={{
          uri: `${COVER_URL}${book.cover}`
        }}
        style={{
          width: 350,
          height: 350,
          resizeMode: 'contain',
          margin: 5,
          borderRadius: 50
        }}
      />
      <Text style={Style.headerTitle}>Written by {book.author.name}</Text>
      <Text style={Style.headerTitlePublished}>
        Published {book.published_at.split('-')[0]}
      </Text>
      <View style={Style.header}>
        <View
          style={{
            ...Style.content,
            alignItems: 'center'
          }}>
          <Text style={{...Style.headerTitlePublished, alignItems: 'center'}}>
            Available narrations:{' '}
          </Text>
        </View>
      </View>

      <Narrations
        narrations={book.narrations.book.narrations}
        advertisements={book.narrations.book.advertisements}
        book_id={id}
      />

      <View style={Style.header}>
        <Text style={Style.synopsis}>
          {book.narrations ? book.narrations.book.synopsis : '...'}
        </Text>
      </View>
    </SafeAreaView>
  )
}
