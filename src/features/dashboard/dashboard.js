import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  SafeAreaView,
  ActivityIndicator,
  SectionList,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native'

import {getBooks} from '../../slices/book'
import BookRow from '../book/book_row'

export default Dashboard = ({navigation}) => {
  const dispatch = useDispatch()
  const books = useSelector(state => state.book.books)
  const sections = useSelector(state => state.book.sections)

  useEffect(() => {
    dispatch(getBooks())
  }, [])

  if (sections) console.debug('sectios', sections, sections[0])

  return (
    <SafeAreaView style={styles.container}>
      {(!sections || !books) && (
        <ActivityIndicator
          animating={true}
          color="#000000"
          size="large"
          style={Styles.activityIndicator}
        />
      )}
      {books && sections && sections.length > 0 && (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <BookRow
              books={books}
              ids={item}
              title={''}
              navigation={navigation}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24
  }
})
