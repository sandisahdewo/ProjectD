import AsyncStorage from '@react-native-community/async-storage'

const setAccessToken = async (accessToken) => {
    await AsyncStorage.setItem('@access_token', accessToken)
} 

const getAccessToken = async () => {
  return await AsyncStorage.getItem('@access_token')
}

const removeAccessToken = async () => {
  await AsyncStorage.removeItem('@access_token')
}

const setUser = async (user) => {
  await AsyncStorage.setItem('@user', JSON.stringify(user))
}

const getUser = async () => {
  const user =  await AsyncStorage.getItem('@user')
  const parseUser = JSON.parse(user)
  return parseUser
}

const removeUser = async () => {
  await AsyncStorage.removeItem('@user')
}

const User = {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
  setUser,
  getUser,
  removeUser
}

export default User