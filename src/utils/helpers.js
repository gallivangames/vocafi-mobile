import {Dimensions} from 'react-native'

export const formatQueryPayload = dataToSend => {
  const formBody = []
  for (const key in dataToSend) {
    const encodedKey = encodeURIComponent(key)
    const encodedValue = encodeURIComponent(dataToSend[key])
    formBody.push(encodedKey + '=' + encodedValue)
  }
  return formBody.join('&')
}

const {width, height} = Dimensions.get('window')

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350
const guidelineBaseHeight = 680

const scale = size => (width / guidelineBaseWidth) * size
const verticalScale = size => (height / guidelineBaseHeight) * size
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor

export {scale, verticalScale, moderateScale}

export const formatTime = time => {
  if (!time || isNaN(time) || !isFinite(time)) return '---'
  const minutes = Math.floor(time / 60)
  const remainingSeconds = Math.floor(time - minutes * 60)
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = Math.floor(minutes - hours * 60)

  if (hours === 0 && remainingMinutes === 0) return remainingSeconds

  if (hours === 0) {
    const displaySeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    return `${remainingMinutes}:${displaySeconds}`
  }

  const displaySeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
  const displayMinutes =
    remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes

  return `${hours}:${displayMinutes}:${displaySeconds}`
}
