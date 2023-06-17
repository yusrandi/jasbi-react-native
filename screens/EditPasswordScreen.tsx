import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { RootStackScreenProps } from '../navigators/RootNavigator'
import Icons from "@expo/vector-icons/AntDesign";
import { useTheme } from '@react-navigation/native';
import { UserType } from '../type/user_type';
import { AuthContext } from '../utils/context/AuthContext';
import FontSize from '../constants/FontSize';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInputPassword from '../components/AppTextInputPassword';
import Spacing from '../constants/Spacing';
import Font from '../constants/Font';
import { Toast } from 'react-native-toast-message/lib/src/Toast';


export default function EditPasswordScreen({ navigation }: RootStackScreenProps<"edit_password">) {

    const { colors } = useTheme();
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const { isLoading, updateUser, userContext } = useContext(AuthContext)

    function handleUpdate() {
        console.log({ password });
        if (password === '' || confirmPassword === '') {
            Toast.show({
                type: 'error',
                text1: 'Jasbi',
                text2: `password and confirm password are required 👋`,
            });

        } else {
            if (password != confirmPassword) {
                Toast.show({
                    type: 'error',
                    text1: 'Jasbi',
                    text2: `password and confirm password not match 👋`,
                });

            } else {
                updateUser(userContext, password)
            }
        }


    }

    function Header() {
        return (
            <View>
                <StatusBar style="dark" />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 20,
                        gap: 18,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            width: 52,
                            aspectRatio: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 52,
                            borderWidth: 1,
                            borderColor: "black",
                        }}
                    >
                        <Icons name="arrowleft" size={24} color={"black"} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>

                        <Text style={{ color: colors.text, fontSize: FontSize.xLarge }} numberOfLines={1}>
                            {userContext?.name}
                        </Text>
                        <Text style={{ color: colors.text, opacity: 0.75, fontSize: FontSize.small }} numberOfLines={1}>
                            {userContext?.email}
                        </Text>
                    </View>

                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <View style={{ padding: 16, flex: 1 }}>
                <AppTextInputPassword placeholder="Password" value={password} onChangeText={value => setPassword(value)} />
                <AppTextInputPassword placeholder="Confirm Password" value={confirmPassword} onChangeText={value => setConfirmPassword(value)} />
            </View>

            <View style={{ padding: 16 }}>
                <TouchableOpacity
                    onPress={handleUpdate}
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
                        {isLoading ? "Updating..." : "Update Password"}
                    </Text>
                </TouchableOpacity>
            </View>

            <Toast />

        </View>
    )
}