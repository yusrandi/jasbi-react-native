import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/RootNavigator';
import FontSize from '../constants/FontSize';
import Font from '../constants/Font';
import Spacing from '../constants/Spacing';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import { Ionicons } from "@expo/vector-icons";
import AppTextInputPassword from '../components/AppTextInputPassword';
import { UserType } from '../type/user_type';
import { AuthContext } from '../utils/context/AuthContext';
import { Toast } from 'react-native-toast-message/lib/src/Toast';


type Props = NativeStackScreenProps<RootStackParamList, "register">;

export default function RegisterScreen({ navigation }: Props) {
    const { colors } = useTheme();
    const [user, setUser] = useState<UserType>({} as UserType)
    const [password, setPassword] = useState<string>('')
    const { register } = useContext(AuthContext);


    function handleRegister() {
        console.log({ user });
        console.log({ password });

        if (user.name === '' || user.address === '' || user.email === '' || user.phone === '' || password === '') {
            return
        }

        register(user, password)

    }

    function Header() {
        return (
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
                        marginVertical: Spacing,
                    }}
                >
                    Create account
                </Text>
                <Text
                    style={{
                        fontFamily: Font["poppins-regular"],
                        fontSize: FontSize.small,
                        color: colors.primary,
                        maxWidth: "80%",
                        textAlign: "center",
                    }}
                >
                    Create an account so you can explore all the existing products
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView>
            <View style={{ padding: Spacing * 2 }}>
                <Header />

                <View
                    style={{
                        marginVertical: Spacing * 3,
                    }}
                >
                    <AppTextInput placeholder="Fullname" value={user.name} onChangeText={value => setUser({ ...user, name: value.toString() })} />
                    <AppTextInput placeholder="Phone" value={user.phone} onChangeText={value => setUser({ ...user, phone: value.toString() })} />
                    <AppTextInput placeholder="Address" value={user.address} onChangeText={value => setUser({ ...user, address: value.toString() })} />
                    <AppTextInput placeholder="Email" value={user.email} onChangeText={value => setUser({ ...user, email: value.toString() })} />
                    <AppTextInputPassword placeholder="Password" value={password} onChangeText={value => setPassword(value)} />

                </View>

                <TouchableOpacity
                    onPress={handleRegister}
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
                        Sign up
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("login")}
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
                        Already have an account
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
                            <Ionicons
                                name="logo-google"
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
                            <Ionicons
                                name="logo-apple"
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
                            <Ionicons
                                name="logo-facebook"
                                color={colors.text}
                                size={Spacing * 2}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <Toast />
        </SafeAreaView>
    )
}