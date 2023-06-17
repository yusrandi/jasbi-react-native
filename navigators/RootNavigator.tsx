import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import {
    NativeStackScreenProps,
    createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ActivityIndicator, View, useColorScheme } from "react-native";
import { CustomDefaultTheme } from "../themes/AppThemes";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabsNavigator, { TabsStackParamList } from "./TabsNavigator";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import DetailScreen from "../screens/DetailScreen";
import { ProductType } from "../type/product_type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { KategoriType } from "../type/kategori_type";
import { getData, removeValue, storeData } from "../utils/LocalStorage";
import { AuthContext } from "../utils/context/AuthContext";
import { UserType } from "../type/user_type";
import EditProfileScreen from "../screens/EditProfileScreen";
import EditPasswordScreen from "../screens/EditPasswordScreen";
import CartScreen from "../screens/CartScreen";
import PaymentDetailScreen from "../screens/PaymentDetailScreen";
import { TransaksiType } from "../type/transaksi_type";
export type RootStackParamList = {
    tabs: NavigatorScreenParams<TabsStackParamList>;
    splash: undefined
    login: undefined
    register: undefined
    cart: undefined
    detail: {
        product: ProductType;
    };
    edit_profile: undefined
    edit_password: undefined
    payment: {
        transaksi: TransaksiType;
    }
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;


export default function RootNavigator() {
    const { isLoading, isLoggedIn } = useContext(AuthContext)

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    return (
        <NavigationContainer theme={CustomDefaultTheme}>
            <BottomSheetModalProvider>
                <RootStack.Navigator initialRouteName={isLoggedIn ? 'tabs' : 'splash'}>

                    {
                        isLoggedIn ?
                            (
                                <>
                                    <RootStack.Screen
                                        name="tabs"
                                        component={TabsNavigator}
                                        options={{
                                            headerShown: false,
                                        }}

                                    />
                                    <RootStack.Screen
                                        name="detail"
                                        component={DetailScreen}
                                        options={{
                                            headerShown: false,
                                        }}
                                    />
                                    <RootStack.Screen
                                        name="edit_profile"
                                        component={EditProfileScreen}
                                        options={{
                                            presentation: 'modal',
                                            headerShown: false,
                                        }}
                                    />
                                    <RootStack.Screen
                                        name="edit_password"
                                        component={EditPasswordScreen}
                                        options={{
                                            presentation: 'modal',
                                            headerShown: false,
                                        }}
                                    />
                                    <RootStack.Screen
                                        name="cart"
                                        component={CartScreen}
                                        options={{
                                            presentation: 'modal',
                                            headerShown: false,
                                        }}
                                    />
                                    <RootStack.Screen
                                        name="payment"
                                        component={PaymentDetailScreen}
                                        options={{
                                            presentation: 'modal',
                                            headerShown: false,
                                        }}
                                    />
                                </>
                            ) :
                            (
                                <>
                                    <RootStack.Screen
                                        name="splash"
                                        component={SplashScreen}
                                        options={{
                                            headerShown: false,
                                        }}
                                    />
                                    <RootStack.Screen
                                        name="login"
                                        component={LoginScreen}
                                        options={{
                                            headerShown: false,
                                        }}
                                    />
                                    <RootStack.Screen
                                        name="register"
                                        component={RegisterScreen}
                                        options={{
                                            headerShown: false,
                                        }}
                                    />
                                </>
                            )
                    }








                </RootStack.Navigator>
            </BottomSheetModalProvider>

        </NavigationContainer>
    )
}