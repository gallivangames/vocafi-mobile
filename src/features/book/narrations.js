import {View, Text, Pressable} from 'react-native'

export default Narrations = ({narrations, handleSelect, selected}) => {
  const playNarration = async narration => {
    handleSelect(narration)
  }

  if (!narrations) return <View />
  const style = selected
    ? {color: '#ffffff', backgroundColor: '#dedede', fontSize: 22}
    : {color: '#ffffff', fontSize: 22}

  return (
    <View>
      {narrations.book.narrations.map(narration => {
        return (
          <Pressable
            key={narration.id}
            onPress={() => playNarration(narration)}>
            <Text style={style}>
              {narration.narrator.name} {narration.length}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
