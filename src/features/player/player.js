import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event
} from 'react-native-track-player'

import {sendUserAction} from '../../slices/user'

const sendActivity = payload => {
  sendUserAction(payload)
}

export const setupPlayer = async () => {
  let isSetup = false
  try {
    await TrackPlayer.getCurrentTrack()
    isSetup = true
  } catch {
    await TrackPlayer.setupPlayer()
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
      },
      capabilities: [
        Capability.Play,
        Capability.Pause
        // Capability.SkipToNext,
        // Capability.SkipToPrevious,
        // Capability.SeekTo
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause
        // Capability.SkipToNext
      ],
      progressUpdateEventInterval: 2
    })

    isSetup = true
  } finally {
    return isSetup
  }
}

export const addTracks = async tracks => {
  await TrackPlayer.add(tracks)
  await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export const playbackService = async () => {
  // these remote items are for when the app is in the background
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.debug('remote play')
    // TODO what do we need to track here?
    // this could be because it's the first time or because of a user, how do we know?
    // get the daata and check current-time
    // if it's zero - then it's auto progress
    // if it's advertisement?
    TrackPlayer.play()
  })
  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    console.debug('remote pause')
    //TODO what do we need to track here?
    // // get data nad send timestamp
    // const index = await TrackPlayer.getCurrentTrack()
    // const track = await TrackPlayer.getTrack(currentTrackId)
    // const payload = {
    //   advertisement_id: track.advertisement_id,
    //   narration_id: track.id,
    //   action: 'user pause',
    //   book_id: track.book_id,
    //   source: 'app' //TODO other info ?? android / ios ?
    // }

    // console.debug('sending user pause from player.js event', payload)
    // sendUserActivity(payload)

    TrackPlayer.pause()
  })
  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    console.debug('remote stop')
    //todo what do we need to track here?
    // get the data and send timestamp (if narration)
    TrackPlayer.destroy()
  })

  TrackPlayer.addEventListener(
    Event.PlaybackTrackChanged,
    async ({nextTrack}) => {
      if (nextTrack) {
        try {
          const track = await TrackPlayer.getTrack(nextTrack)

          const payload = {
            advertisement_id: track.advertisement_id,
            narration_id: track.id,
            action: 'auto progress',
            book_id: track.book_id,
            source: 'app'
          }

          if (track.book_mark) {
            sendActivity({...payload, action: 'continue playing'})
            const start = track.book_mark > 5 ? track.book_mark - 5 : 0
            TrackPlayer.seekTo(start)
          } else {
            sendActivity(payload)
          }
        } catch (e) {
          console.error(e)
        }
      }
    }
  )

  TrackPlayer.addEventListener(Event.RemoteSeek, async position => {
    console.debug('remote seek', position)
    // TrackPlayer.seekTo(position.position),
  })

  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async () => {
    const position = await TrackPlayer.getPosition()
    const index = await TrackPlayer.getCurrentTrack()
    const track = await TrackPlayer.getTrack(index)

    if (track.id && !track.advertisement_id) {
      const payload = {
        narration_id: track.id,
        current_time: position,
        action: 'update bookmark',
        book_id: track.book_id,
        source: 'app'
      }

      sendActivity(payload)
    }
  })
}
