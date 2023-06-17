import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacing from '../constants/Spacing';
import { StatusBar } from 'expo-status-bar';
import FontSize from '../constants/FontSize';
import Font from '../constants/Font';
import Colors from '../constants/Colors';
import { useTheme } from '@react-navigation/native';
import Icons from "@expo/vector-icons/AntDesign";
import AppTextInput from '../components/AppTextInput';
import { LoginApi } from '../api/LoginApi';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { UserTypeResponse } from '../type/user_type';
import { storeData } from '../utils/LocalStorage';
import { AuthContext } from '../utils/context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';


type Props = NativeStackScreenProps<RootStackParamList, "login">;

export default function LoginScreen({ navigation }: Props) {
    const { colors } = useTheme();
    const { login, isLoading } = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin() {
        console.log({ email });
        console.log({ password });

        if (email === '' || password === '') {
            return
        }
        login(email, password)

    }
    return (
        <SafeAreaView>
            <View style={{
                padding: Spacing * 2,
            }}>
                <StatusBar style={'auto'} />
                <View
                    style={{
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: FontSize.xLarge,
                            color: colors.primary,
                            fontFamily: Font["poppins-bold"],
                            marginVertical: Spacing * 3,
                        }}
                    >
                        Login here
                    </Text>
                    <Text
                        style={{
                            fontFamily: Font["poppins-semiBold"],
                            fontSize: FontSize.large,
                            color: Colors.primary,
                            maxWidth: "60%",
                            textAlign: "center",
                        }}
                    >
                        Welcome back you've been missed!
                    </Text>
                </View>

                <View
                    style={{
                        marginVertical: Spacing * 3,
                    }}
                >
                    <AppTextInput placeholder="Email" onChangeText={newText => setEmail(newText)} value={email} />
                    <AppTextInput placeholder="Password" onChangeText={newText => setPassword(newText)} secureTextEntry value={password} />
                </View>

                <View>
                    <Text
                        style={{
                            fontFamily: Font["poppins-semiBold"],
                            fontSize: FontSize.small,
                            color: Colors.primary,
                            alignSelf: "flex-end",
                        }}
                    >
                        Forgot your password ?
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={handleLogin}
                    style={{
                        padding: Spacing * 2,
                        backgroundColor: colors.primary,
                        marginVertical: Spacing * 3,
                        borderRadius: Spacing * Spacing,
                        shadowColor: colors.primary,
                        shadowOffset: {
                            width: 0,
                            height: Spacing,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: Spacing * Spacing,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: Font["poppins-bold"],
                            color: colors.card,
                            textAlign: "center",
                            fontSize: FontSize.large,
                        }}
                    >
                        Sign in
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("register")}
                    style={{
                        padding: Spacing,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: Font["poppins-semiBold"],
                            color: colors.text,
                            textAlign: "center",
                            fontSize: FontSize.small,
                        }}
                    >
                        Create new account
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        marginVertical: Spacing * 3,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: Font["poppins-semiBold"],
                            color: colors.primary,
                            textAlign: "center",
                            fontSize: FontSize.small,
                        }}
                    >
                        Or continue with
                    </Text>

                    <View
                        style={{
                            marginTop: Spacing,
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                padding: Spacing,
                                backgroundColor: colors.card,
                                borderRadius: Spacing / 2,
                                marginHorizontal: Spacing,
                            }}
                        >
                            <Icons
                                name="google"
                                color={colors.text}
                                size={Spacing * 2}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                padding: Spacing,
                                backgroundColor: colors.card,
                                borderRadius: Spacing / 2,
                                marginHorizontal: Spacing,
                            }}
                        >
                            <Icons
                                name="apple1"
                                color={colors.text}
                                size={Spacing * 2}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                padding: Spacing,
                                backgroundColor: colors.card,
                                borderRadius: Spacing / 2,
                                marginHorizontal: Spacing,
                            }}
                        >
                            <Icons
                                name="facebook-square"
                                color={colors.text}
                                size={Spacing * 2}
                            />
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
            <Toast />
            <Spinner
                visible={isLoading}
                textContent={'...'}
                textStyle={{ color: 'white' }}
            />

        </SafeAreaView>

    )
}