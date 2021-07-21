import AsyncStorage from '@react-native-async-storage/async-storage'

export const updateDataInStorage = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    console.log({ setData: jsonValue })
    await AsyncStorage.setItem('@grudges_Key', jsonValue)
  } catch (e) {
    console.log(e)
  }
}

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@grudges_Key')
    console.log({ getData: JSON.parse(jsonValue) })
    return jsonValue ? JSON.parse(jsonValue) : []
  } catch (e) {
    console.log(e)
  }
}
