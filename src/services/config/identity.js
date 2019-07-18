import AsyncStorage from '@react-native-community/async-storage';

const setAccessToken = async (accessToken) => {
    await AsyncStorage.setItem('@access_token', accessToken)
} 

const getAccessToken = async () => {
  return await AsyncStorage.getItem('@access_token')
}

const setUser = async (user) => {
  await AsyncStorage.setItem('@user', JSON.stringify(user));
}

const getUser = async () => {
  return await AsyncStorage.getItem('@user');
}

const Identity = {
  setAccessToken,
  getAccessToken,
  setUser,
  getUser
}

export default Identity;