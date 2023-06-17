import React, { createContext, useEffect, useState } from "react";
import { UserType, UserTypeResponse } from "../../type/user_type";
import { removeValue, storeData } from "../LocalStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginApi } from "../../api/LoginApi";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { RegisterApi } from "../../api/RegisterApi";
import { UpdateUserApi } from "../../api/UpdateUserApi";
interface props {
    children: JSX.Element
}
export type AuthContextProps = {
    isLoading: boolean
    isLoggedIn: boolean
    userContext: UserType,
    login: (email: string, password: string) => void
    register: (user: UserType, password: string) => void
    updateUser: (user: UserType, password: string) => void
    logOut: () => void
}
export const AuthContext = createContext({} as AuthContextProps);
export const AuthProvider = ({ children }: props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<UserType>({} as UserType)

    const emptyUser: UserType = {
        id: 0,
        name: "",
        address: "",
        phone: "",
        email: "",
        role: ""
    }
    const register = async (user: UserType, password: string) => {
        setUser(emptyUser)
        const response: UserTypeResponse = await RegisterApi(user, password)

        console.log({ response });


        Toast.show({
            text1: 'Jasbi',
            text2: `${response.responsemsg} 👋`,
        });

        if (response.responsecode === 1) {
            setUser(response.responsedata)
            storeData(response.responsedata)
            setIsLoggedIn(true)
        }
        setIsLoading(false)

    }
    const login = async (email: string, password: string) => {
        setUser(emptyUser)
        const response: UserTypeResponse = await LoginApi(email, password)

        Toast.show({
            text1: 'Jasbi',
            text2: `${response.responsemsg} 👋`,
        });

        if (response.responsecode === 1) {
            setUser(response.responsedata)
            storeData(response.responsedata)
            setIsLoggedIn(true)
        }
        setIsLoading(false)

    }

    async function handleUpdate(userNew: UserType, password: string) {
        setUser(emptyUser)
        setIsLoading(true)
        const response: UserTypeResponse = await UpdateUserApi(userNew, password)
        if (response.responsecode === 1) {
            Toast.show({
                text1: 'Jasbi',
                text2: `${response.responsemsg} 👋`,
            });
            setUser(userNew)
            await removeValue()
            storeData(userNew)
        }
        setIsLoading(false)
        console.log({ response });
    }
    const logOut = async () => {
        setIsLoading(true)
        setUser(emptyUser)
        setIsLoggedIn(false)
        await removeValue()
        setIsLoading(false)
    }
    const isLoggedInInit = async () => {
        try {
            setIsLoading(true)
            let user = await AsyncStorage.getItem('user')
            console.log({ user });

            if (user !== null) {
                setUser(JSON.parse(user!) as UserType)
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }

            setIsLoading(false)
        } catch (error) {
            console.log({ error });
        }
    }
    useEffect(() => {
        isLoggedInInit()
    }, [])
    return (
        <AuthContext.Provider value={{ isLoading: isLoading, userContext: user, isLoggedIn: isLoggedIn, login: login, logOut: logOut, register: register, updateUser: handleUpdate }}>
            {children}
        </AuthContext.Provider>

    )
}
