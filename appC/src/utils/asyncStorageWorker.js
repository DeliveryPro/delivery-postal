import AsyncStorage from '@react-native-community/async-storage'
import logger from './logger'

const _store = async ({ key, data }) => {
    try {
        data && (await AsyncStorage.setItem(key, JSON.stringify(data)))
    } catch (e) {
        logger('AsyncStorageUtils _store', e)
    }
}

const _get = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key)
        if (!data) return null
        return JSON.parse(data)
    } catch (e) {
        logger('AsyncStorageUtils _get', e)
    }
}

const _remove = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        logger('AsyncStorageUtils _remove', e)
    }
}

const AsyncStorageUtils = {
    _store,
    _get,
    _remove,
}

export default AsyncStorageUtils
