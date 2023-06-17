import { View, Text, Button, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/RootNavigator';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Font from '../constants/Font';

type Props = NativeStackScreenProps<RootStackParamList, "splash">;
const { height } = Dimensions.get("window");

export default function SplashScreen({ navigation }: Props) {
    const { colors } = useTheme();

    return (
        <SafeAreaView>
            <View style={{ position: 'absolute', flex: 1, height: height }}>
                <StatusBar style={'auto'} />
                <View style={{ flex: 1, marginVertical: Spacing * 2, justifyContent: 'flex-end' }}>
                    <ImageBackground
                        style={{
                            height: height / 2.5,
                        }}
                        resizeMode="contain"
                        source={require("../assets/images/welcome-img.png")}
                    />

                </View>
                <SafeAreaView>
                    <View>
                        <View
                            style={{
                                paddingHorizontal: Spacing * 4,
                                paddingTop: Spacing * 4,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: FontSize.xxLarge,
                                    color: colors.primary,
                                    fontFamily: Font["poppins-bold"],
                                    textAlign: "center",
                                }}
                            >
                                JASBI
                            </Text>

                            <Text
                                style={{
                                    fontSize: FontSize.medium,
                                    color: colors.text,
                                    fontFamily: Font["poppins-regular"],
                                    textAlign: "center",
                                    marginTop: Spacing * 2,
                                }}
                            >
                                Jasa titip bingkisan tanpa ribet
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            paddingVertical: Spacing * 2,
                            paddingHorizontal: Spacing * 2,
                            paddingTop: Spacing * 6,
                            flexDirection: "row",
                            gap: 12
                        }}
                    >

                        <TouchableOpacity
                            onPress={() => navigation.navigate("login")}
                            style={{
                                backgroundColor: colors.primary,
                                paddingVertical: Spacing * 1.5,
                                paddingHorizontal: Spacing * 2,
                                width: "48%",
                                borderRadius: Spacing * Spacing,
                                shadowColor: colors.primary,
                                shadowOffset: {
                                    width: 0,
                                    height: Spacing,
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: Spacing,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: Font["poppins-bold"],
                                    color: colors.card,
                                    fontSize: FontSize.large,
                                    textAlign: "center",
                                }}
                            >
                                Login
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("register")}
                            style={{
                                paddingVertical: Spacing * 1.5,
                                paddingHorizontal: Spacing * 2,
                                width: "48%",
                                borderRadius: Spacing * Spacing,
                                borderColor: colors.border,
                                borderWidth: 1

                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: Font["poppins-bold"],
                                    color: colors.text,
                                    fontSize: FontSize.large,
                                    textAlign: "center",
                                }}
                            >
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </SafeAreaView>
    )
}