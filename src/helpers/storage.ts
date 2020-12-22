import AsyncStorage from '@react-native-async-storage/async-storage'

const setData = async (key: string, value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

const getData = async (key: string): Promise<string | null> => { 
  try {
    const item = await AsyncStorage.getItem(key)
    return item
  } catch {
    return null
  }
}

export {
  setData, getData
}