import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { RootStackScreenProps } from '../navigators/RootNavigator'

import Icons from "@expo/vector-icons/AntDesign";
import { useTheme } from '@react-navigation/native'
import FontSize from '../constants/FontSize'
import Font from '../constants/Font'
import AppTextInput from '../components/AppTextInput'
import { UserType, UserTypeResponse } from '../type/user_type'
import Spacing from '../constants/Spacing'
import { UpdateUserApi } from '../api/UpdateUserApi'
import { AuthContext } from '../utils/context/AuthContext'


export default function EditProfileScreen(
    {
        navigation,

    }: RootStackScreenProps<"edit_profile">

) {

    const { colors } = useTheme();

    const { isLoading, updateUser, userContext } = useContext(AuthContext)
    const [userNew, setUserNew] = useState<UserType>(userContext)

    function handleUpdate() {
        console.log({ userNew });

        updateUser(userNew, "")
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

                        <Text style={{ color: colors.text, fontSize: FontSize.large, fontWeight: 'bold' }} numberOfLines={1}>
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
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    padding: 16,
                    flex: 1,
                }}>
                <AppTextInput placeholder="Name" onChangeText={newText => setUserNew({ ...userNew, name: newText })} value={userNew.name} />
                <AppTextInput editable={false} selectTextOnFocus={false} placeholder="Email" onChangeText={newText => setUserNew({ ...userNew, email: newText })} value={userNew.email} />
                <AppTextInput placeholder="Phone" onChangeText={newText => setUserNew({ ...userNew, phone: newText })} value={userNew.phone} />
                <AppTextInput placeholder="Address" onChangeText={newText => setUserNew({ ...userNew, address: newText })} value={userNew.address} />

            </ScrollView>

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
                        {isLoading ? "Updating..." : "Update Profile"}
                    </Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}