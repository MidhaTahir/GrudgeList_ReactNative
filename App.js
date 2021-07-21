import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from 'react-native'
import GrudgeItem from './components/GrudgeItem'
import { updateDataInStorage, getData } from './utils/AsyncStorageUtils'

export default function App() {
  const [grudge, setGrudge] = useState('')
  const [grudges, setGrudges] = useState([])

  const handleAdd = () => {
    // to hide keyboard
    // Keyboard.dismiss()
    setGrudges((prev) => [...prev, grudge])
    setGrudge('')
  }

  const handleDelete = (index) => {
    let grudgersCopy = [...grudges]
    grudgersCopy.splice(index, 1)
    setGrudges(grudgersCopy)
  }

  useEffect(() => {
    const getDataFromStorage = async() => {
      const _grudges = await getData()
      setGrudges(_grudges)
    }
    getDataFromStorage()
  },[])


  useEffect(() => {
    updateDataInStorage(grudges)
  }, [grudges])

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Text style={styles.textHeading}>Today's Grudges</Text>
      </View>
      <View>
        <FlatList
          data={grudges}
          keyExtractor={(item,idx) => idx.toString()}
          renderItem={(data) => (
            <GrudgeItem
              item={data.item}
              onPress={() => handleDelete(data.index)}
            />
          )}
        />
      </View>
      {/* to make things go up when keyboard is open */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.textInputWrapper}
          placeholder={'Write a Grudge...'}
          value={grudge}
          onChangeText={(text) => setGrudge(text)}
        />
        <TouchableOpacity onPress={() => handleAdd()}>
          <View style={styles.addWrapper}>
            <Text style={styles.icon}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  headContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  textHeading: {
    color: '#1A1A1A',
    fontSize: 24,
    fontWeight: 'bold',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  textInputWrapper: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 60,
    width: '70%',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 30,
  }
})
