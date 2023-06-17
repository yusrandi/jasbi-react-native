import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useContext, useRef, useState } from 'react'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from "@gorhom/bottom-sheet";
import Icons from "@expo/vector-icons/AntDesign";
import Spacing from '../constants/Spacing';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import { AuthContext } from '../utils/context/AuthContext';
import FilterView from '../components/FilterView';
import AppTextInput from '../components/AppTextInput';
import { UserType } from '../type/user_type';
import { TabsStackScreenProps } from '../navigators/TabsNavigator';


export default function ProfileScreen({ navigation }: TabsStackScreenProps<"profile">) {

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const bottomSheetModalRefPassword = useRef<BottomSheetModal>(null);
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();

    const AVATAR_URL = "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
    const { isLoading, logOut, userContext } = useContext(AuthContext)

    function Header() {
        return (
            <View style={{ paddingHorizontal: 24, flexDirection: "column", alignItems: "center", gap: 8 }}>
                <Image source={{ uri: AVATAR_URL, }} style={{ width: 152, aspectRatio: 1, borderRadius: 152 }} resizeMode="cover" />
                <View >
                    <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8, color: colors.text, }} numberOfLines={1}>
                        Hi, {userContext?.name} 👋
                    </Text>

                </View>

            </View>
        )
    }


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing, gap: 8 }}>
            <Header />
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("edit_profile", {
                        user: userContext
                    });
                }}
                style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', alignItems: 'center', gap: Spacing * 2, padding: Spacing, borderRadius: Spacing * 2 }}>

                <Icons name='user' size={20} color={colors.text} style={{ opacity: 0.5 }} />
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: colors.text,
                        }}
                    >
                        Edit Profile
                    </Text>
                    <Text
                        style={{ color: colors.text, opacity: 0.75 }}
                        numberOfLines={3}
                    >
                        nama, email, alamat, nomor handphone
                    </Text>
                </View>
                <Icons name='right' size={16} color={colors.text} style={{ opacity: 0.5 }} />

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("edit_password", {
                        user: userContext
                    });
                }}
                style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', alignItems: 'center', gap: Spacing * 2, padding: Spacing, borderRadius: Spacing * 2 }}>

                <Icons name='key' size={20} color={colors.text} style={{ opacity: 0.5 }} />
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: colors.text,
                        }}
                    >
                        Edit Password
                    </Text>
                    <Text
                        style={{ color: colors.text, opacity: 0.75 }}
                        numberOfLines={3}
                    >
                        reset atau ganti password anda
                    </Text>
                </View>
                <Icons name='right' size={16} color={colors.text} style={{ opacity: 0.5 }} />

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => logOut()}
                style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', alignItems: 'center', gap: Spacing * 2, paddingHorizontal: Spacing, paddingVertical: Spacing * 2, borderRadius: Spacing * 2 }}>

                <Icons name='logout' size={18} color={colors.text} style={{ opacity: 0.5 }} />
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: colors.text,
                        }}
                    >
                        Log Out
                    </Text>

                </View>

            </TouchableOpacity>


        </View>
    )
}