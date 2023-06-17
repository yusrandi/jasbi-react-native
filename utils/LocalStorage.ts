import AsyncStorage from "@react-native-async-storage/async-storage"
import { UserType } from "../type/user_type"

export const storeData = async (value: UserType) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('user', jsonValue)
    } catch (e) {
        // saving error
    }
}
export const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('user')
        // console.log({ value });

        if (value !== null) {
            // value previously stored
        }
        return value
    } catch (e) {
        // error reading value
        return null
    }
}
export const removeValue = async () => {
    try {
        await AsyncStorage.removeItem('user')
    } catch (e) {
        // remove error
    }

    console.log('Done.')
}
