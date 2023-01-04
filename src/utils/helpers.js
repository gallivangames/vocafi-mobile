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
